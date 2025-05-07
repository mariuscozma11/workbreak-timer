import React, { createContext, useContext, useState } from 'react';

// Define types for our context
type TimerContextType = {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  cyclesBeforeLongBreak: number;
  setWorkDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
  setLongBreakDuration: (duration: number) => void;
  setCyclesBeforeLongBreak: (cycles: number) => void;
};

// Create context with default values
const TimerContext = createContext<TimerContextType>({
  workDuration: 25 * 60, // 25 minutes in seconds
  breakDuration: 5 * 60, // 5 minutes in seconds
  longBreakDuration: 15 * 60, // 15 minutes in seconds
  cyclesBeforeLongBreak: 4, // 4 cycles before a long break
  setWorkDuration: () => {},
  setBreakDuration: () => {},
  setLongBreakDuration: () => {},
  setCyclesBeforeLongBreak: () => {},
});

// Create provider component
export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [workDuration, setWorkDuration] = useState<number>(25 * 60);
  const [breakDuration, setBreakDuration] = useState<number>(5 * 60);
  const [longBreakDuration, setLongBreakDuration] = useState<number>(15 * 60);
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState<number>(4);

  const value = {
    workDuration,
    breakDuration,
    longBreakDuration,
    cyclesBeforeLongBreak,
    setWorkDuration,
    setBreakDuration,
    setLongBreakDuration,
    setCyclesBeforeLongBreak,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

// Custom hook for using the context
export function useTimerContext() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
}