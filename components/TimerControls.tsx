import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react-native';

interface TimerControlsProps {
  isActive: boolean;
  isPaused: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  color: string;
}

export default function TimerControls({
  isActive,
  isPaused,
  onPlayPause,
  onReset,
  onSkip,
  color,
}: TimerControlsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.resetButton, { borderColor: color }]}
        onPress={onReset}
        activeOpacity={0.7}
      >
        <RotateCcw size={24} color={color} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.playPauseButton, { backgroundColor: color }]}
        onPress={onPlayPause}
        activeOpacity={0.7}
      >
        {isActive && !isPaused ? (
          <Pause size={28} color="white" />
        ) : (
          <Play size={28} color="white" />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.skipButton, { borderColor: color }]}
        onPress={onSkip}
        activeOpacity={0.7}
      >
        <SkipForward size={24} color={color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  playPauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  resetButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  skipButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});