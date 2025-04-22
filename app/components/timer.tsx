import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Play, RotateCcw, Pause } from "lucide-react-native";

const formatTime = (totalSeconds: number): string => {
    // Total seconds calculation
    const nonNegativeSeconds = Math.max(0, totalSeconds);
  
    // Minute calculation
    const minutes = Math.floor(nonNegativeSeconds / 60);
  
    //Second calculation
    const seconds = nonNegativeSeconds % 60;
  
    //Minute and seconds formatting
    const formattedMinutes = String(minutes).padStart(2, '0'); // Ex: 5 devine "05"
    const formattedSeconds = String(seconds).padStart(2, '0'); // Ex: 9 devine "09"
  
    // Combination to a string
    return `${formattedMinutes}:${formattedSeconds}`;
  };

//Timer component
const Timer = () => {

    const [isActive, setIsActive] = useState(false);//Tracks if the timer is running
    const [isPaused, setIsPaused] = useState(false);//Tracks if the timer is paused
    const [workDuration, setWorkDuration] = useState(1500); // Initial work duration 25 minutes in seconds
    const [breakDuration, setBreakDuration] = useState(5 * 60); // Initial break duration 5 minutes in seconds
    const [currentMode, setCurrentMode] = useState<"work" | "break">("work"); // Initial mode is work, can be "work" or "break"
    const [seconds, setSeconds] = useState(workDuration); //Initial value of seconds

    useEffect(() => {
        
        let intervalId: NodeJS.Timeout | null = null; //ID variable

        //Effect to handle the timer logic
        if (isActive && !isPaused) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds =>{
                    if (prevSeconds > 0) {
                        return prevSeconds -1;
                    }
                    else {
                        setIsActive(false);
                        if (intervalId) clearInterval(intervalId);
                        return 0;
                    }
                });
            }, 1000);//1 second interval
        }

        return () => {

            if (intervalId) {
              clearInterval(intervalId);
            }
          };

    }, );

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
        } else if (currentMode) {
            setSeconds(breakDuration);
        }
    };
      
    const isRunning = isActive && !isPaused;

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>
                {formatTime(seconds)}
            </Text>
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