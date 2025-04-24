import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Play, RotateCcw, Pause } from "lucide-react-native";

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
    const [isActive, setIsActive] = useState(false);//Tracks if the timer is running
    const [isPaused, setIsPaused] = useState(false);//Tracks if the timer is paused
    const [workDuration, setWorkDuration] = useState(5); //Initial work duration 25 minutes in seconds
    const [breakDuration, setBreakDuration] = useState(5 * 60); //Initial short break duration 5 minutes in seconds
    const [longBreakDuration, setLongBreakDuration] = useState(15 * 60); //Long break duration 15 minutes in seconds

    const [currentMode, setCurrentMode] = useState<"work" | "break" | "long_break">("work"); //Initial mode is work, can be "work" or "break"
    const [pomodoroCount, setPomodoroCount] = useState(0); //Initial pomodoro cycle count
    const [cyclesBeforeLongBreak, setcyclesBeforeLongBreak] = useState(2);
    
    const [seconds, setSeconds] = useState(workDuration); //Initial value of seconds
    

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
                              nextPomodoroCount = 0; // Resetează contorul
                            } else {
                              nextMode = 'break';
                              nextDuration = breakDuration;
                            }
                          } else { // După o pauză (scurtă sau lungă), urmează 'work'
                            nextMode = 'work';
                            nextDuration = workDuration;
                            // Contorul nu se schimbă după pauză
                            }

                        setCurrentMode(nextMode);
                        setPomodoroCount(nextPomodoroCount);
                        setSeconds(nextDuration);

                        return 0;
                    }
                });
            }, 1000);//1 second interval
        }

        return () => {
            //Cleanup function to clear the interval when the component unmounts or isActive changes
            if (intervalId) {
              clearInterval(intervalId);
            }
          };

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