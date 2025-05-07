import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TimerContextType {
    workDuration: number;
    breakDuration: number;
    longBreakDuration: number;
    cyclesBeforeLongBreak: number;
    setWorkDuration: (duration: number) => void;
    setBreakDuration: (duration: number) => void;
    setLongBreakDuration: (duration: number) => void;
  }

  const TimerContext = createContext<TimerContextType | undefined>(undefined);

  const DEFAULT_WORK_DURATION = 25 * 60;
  const DEFAULT_SBREAK_DURATION = 5 * 60;
  const DEFAULT_LBREAK_DURATION = 15 * 60;
  const DEFAULT_CYCLES_BEFORE_LONG_BREAK = 2;


  export const TimerProvider = ({ children }: { children: ReactNode }) => {

    const [workDuration, setWorkDuration] = useState(DEFAULT_WORK_DURATION);
    const [breakDuration, setBreakDuration] = useState(DEFAULT_SBREAK_DURATION);
    const [longBreakDuration, setLongBreakDuration] = useState(DEFAULT_LBREAK_DURATION);
    const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(DEFAULT_CYCLES_BEFORE_LONG_BREAK);
  
    const value = {
      workDuration,
      setWorkDuration,
      breakDuration,
      setBreakDuration,
      longBreakDuration,
      setLongBreakDuration,
      cyclesBeforeLongBreak,
      setCyclesBeforeLongBreak
    };
  
    return (
      <TimerContext.Provider value={value}>
        {children}
      </TimerContext.Provider>
    );
  };

  export const useTimerContext = () => {
    const context = useContext(TimerContext);
    if (context === undefined) {
      throw new Error('useTimerContext must be used within a TimerProvider');
    }
    return context;
  };