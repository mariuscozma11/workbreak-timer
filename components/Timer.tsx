import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { useTimerContext } from '@/context/TimerContext';
import TimerControls from './TimerControls';
import CircularProgress from './CircularProgress';

// Define types for the timer mode
export type TimerMode = 'work' | 'break' | 'long_break';

export default function Timer() {
  const {
    workDuration,
    breakDuration,
    longBreakDuration,
    cyclesBeforeLongBreak,
  } = useTimerContext();

  // Local state
  const [seconds, setSeconds] = useState<number>(workDuration);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [currentMode, setCurrentMode] = useState<TimerMode>('work');
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Calculate the total duration for the current mode
  const getTotalDuration = useCallback(() => {
    switch (currentMode) {
      case 'work':
        return workDuration;
      case 'break':
        return breakDuration;
      case 'long_break':
        return longBreakDuration;
      default:
        return workDuration;
    }
  }, [currentMode, workDuration, breakDuration, longBreakDuration]);

  // Calculate the next cycle state
  const calculateNextCycleState = useCallback(() => {
    let nextMode: TimerMode;
    let nextPomodoroCount = pomodoroCount;

    if (currentMode === 'work') {
      nextPomodoroCount = pomodoroCount + 1;
      // Check if we need a long break
      if (nextPomodoroCount % cyclesBeforeLongBreak === 0) {
        nextMode = 'long_break';
      } else {
        nextMode = 'break';
      }
    } else {
      // After any break, go back to work mode
      nextMode = 'work';
    }

    const nextDuration = nextMode === 'work' 
      ? workDuration 
      : nextMode === 'break' 
        ? breakDuration 
        : longBreakDuration;

    return {
      mode: nextMode,
      pomodoroCount: nextPomodoroCount,
      duration: nextDuration,
    };
  }, [
    currentMode,
    pomodoroCount,
    cyclesBeforeLongBreak,
    workDuration,
    breakDuration,
    longBreakDuration,
  ]);

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  // Handle reset
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setCurrentMode('work');
    setPomodoroCount(0);
    setSeconds(workDuration);
  };

  // Handle skip to next cycle
  const handleSkip = () => {
    const { mode, pomodoroCount: nextCount, duration } = calculateNextCycleState();
    
    // Animate the transition
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setCurrentMode(mode);
    setPomodoroCount(nextCount);
    setSeconds(duration);
    setIsActive(false);
    setIsPaused(true);
  };

  // Update seconds when active and not paused
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            // Time's up, go to next cycle
            clearInterval(interval);
            const { mode, pomodoroCount: nextCount, duration } = calculateNextCycleState();
            
            // Animate the transition
            Animated.sequence([
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }),
            ]).start();
            
            setCurrentMode(mode);
            setPomodoroCount(nextCount);
            setIsActive(false);
            setIsPaused(true);
            
            // Alert the user
            if (typeof document !== 'undefined') {
              // Only on web
              const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
              audio.play().catch(e => console.log('Audio play error:', e));
            }
            
            return duration;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, calculateNextCycleState, fadeAnim]);

  // Update seconds when durations change (if timer is not active)
  useEffect(() => {
    if (!isActive) {
      setSeconds(getTotalDuration());
    }
  }, [workDuration, breakDuration, longBreakDuration, currentMode, isActive, getTotalDuration]);

  // Get color based on current mode
  const getModeColor = () => {
    switch (currentMode) {
      case 'work':
        return '#2DD4BF'; // teal
      case 'break':
        return '#8B5CF6'; // purple
      case 'long_break':
        return '#6366F1'; // indigo
      default:
        return '#2DD4BF';
    }
  };

  const modeLabel = currentMode === 'work' 
    ? 'WORK' 
    : currentMode === 'break' 
      ? 'SHORT BREAK' 
      : 'LONG BREAK';

  const progress = seconds / getTotalDuration();
  const colorStyle = { color: getModeColor() };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.timerContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.modeLabel, colorStyle]}>{modeLabel}</Text>
        
        <CircularProgress
          progress={progress}
          color={getModeColor()}
          size={250}
          strokeWidth={15}
        >
          <Text style={styles.timeText}>{formatTime(seconds)}</Text>
        </CircularProgress>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Completed: {pomodoroCount} cycle{pomodoroCount !== 1 ? 's' : ''}
          </Text>
          <Text style={styles.statsText}>
            Next long break in: {cyclesBeforeLongBreak - (pomodoroCount % cyclesBeforeLongBreak)} cycle{(cyclesBeforeLongBreak - (pomodoroCount % cyclesBeforeLongBreak)) !== 1 ? 's' : ''}
          </Text>
        </View>

        <TimerControls
          isActive={isActive}
          isPaused={isPaused}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onSkip={handleSkip}
          color={getModeColor()}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: 1,
  },
  timeText: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
  },
  statsContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    color: '#64748B',
    marginVertical: 4,
  },
});