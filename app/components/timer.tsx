import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Play, RotateCcw, Pause } from "lucide-react-native";
import { useTimerContext } from '../context/TimerContext'; // Ajustează calea

//Function to format time in MM:SS format
const formatTime = (totalSeconds: number): string => {
    const nonNegativeSeconds = Math.max(0, totalSeconds); //Total seconds calculation
    const minutes = Math.floor(nonNegativeSeconds / 60);//Minute calculation
    const seconds = nonNegativeSeconds % 60;//Second calculation
    const formattedMinutes = String(minutes).padStart(2, '0');//Minute and seconds formatting
    const formattedSeconds = String(seconds).padStart(2, '0');  
    return `${formattedMinutes}:${formattedSeconds}`;// Combination to a string
  };

//Timer component
const Timer = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const { workDuration , breakDuration, longBreakDuration, cyclesBeforeLongBreak } = useTimerContext();
    const [currentMode, setCurrentMode] = useState<"work" | "break" | "long_break">("work");
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [seconds, setSeconds] = useState(workDuration);

    useEffect(() => {
        if (!isActive && currentMode === 'work') {
          setSeconds(workDuration)
        }
      }, [workDuration, isActive, currentMode]);    

    useEffect(() => {
        
        let intervalId: NodeJS.Timeout | null = null; //ID variable
        
        //Decrementing interval condition
        if (isActive && !isPaused) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds =>{
                    if (prevSeconds > 0) {
                        return prevSeconds -1;
                    }
                    else {

                        setIsActive(false);
                        setIsPaused(true);

                        let nextMode: typeof currentMode = 'work';
                        let nextDuration = workDuration;
                        let nextPomodoroCount = pomodoroCount;

                        if (currentMode === 'work') {
                            nextPomodoroCount++;
                            if (nextPomodoroCount >= cyclesBeforeLongBreak) {
                              nextMode = 'long_break';
                              nextDuration = longBreakDuration;
                              nextPomodoroCount = 0; 
                            } else {
                              nextMode = 'break';
                              nextDuration = breakDuration;
                            }
                          } else { 
                            nextMode = 'work';
                            nextDuration = workDuration;
                            
                            }

                        setCurrentMode(nextMode);
                        setPomodoroCount(nextPomodoroCount);
                        setSeconds(nextDuration);

                        return 0;
                    }
                });
            }, 1000);//1 second interval
        }
        return () => { if (intervalId) { clearInterval(intervalId); } };

    }, [isActive, isPaused]);

    const handlePlayPause = () => {

        if (!isActive) {
            setIsActive(true);
            setIsPaused(false);
        } else {
            setIsPaused(prevPaused => !prevPaused);
        }
      };

    const handleReset = () => {
        setIsActive(false);
        setIsPaused(true);

        if (currentMode === "work") {
            setSeconds(workDuration);
        } else if (currentMode === "break") {
            setSeconds(breakDuration);
        } else if (currentMode === "long_break") {
            setSeconds(longBreakDuration);
        }
        
    };
      
    const isRunning = isActive && !isPaused;

    return (
        
        <View style={styles.container}>
            <Text style={styles.modeText}>Mode: {currentMode.replace('_', ' ')}</Text>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity  onPress={handlePlayPause} style={styles.button}>
                    {!isRunning? ( <Play color="white" size={35} />) : ( <Pause color="white" size={35} /> )}
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReset} style={styles.button}>
                    <RotateCcw color="white" size={35} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Base Styles
const styles = StyleSheet.create({
    modeText: {
        fontSize: 20,
        marginBottom: 10,
        color: '#ccc', // Sau altă culoare
        textTransform: 'capitalize',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    timerText: {
        fontSize: 80,
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
    },
    button:{
        padding: 20,
        color: "white",
        backgroundColor: "black",
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 60,
    },
    });

//Exporting Timer components
export default Timer;