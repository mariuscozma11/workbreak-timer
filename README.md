# WorkBreak Timer (MVP)

## Description

A simple mobile application, built with React Native, that implements the Pomodoro Technique to help with time management and improving focus. This is the Minimum Viable Product (MVP) version, focusing on the core timer functionality.

## Core Features (MVP Version)

1.  **Pomodoro Timer:**
    * Runs a work/break cycle.
    * **Work Duration (Focus Time):** Defaults to 25 minutes.
    * **Short Break Duration:** Defaults to 5 minutes.
    * Visually displays the remaining time for the current interval.

2.  **Timer Controls:**
    * **Play/Pause Button:** Starts or pauses the timer for the current interval.
    * **Reset Button:** Stops the timer and resets the current interval to its full duration (e.g., back to 25 minutes if during a work interval).

3.  **Settings (Accessible via Floating Action Button - FAB):**
    * A simple settings screen accessed via a visible FAB (+) / (⚙️) on the main screen.
    * **Customize Work Duration:** Allows the user to modify the default work interval duration.
    * **Customize Break Duration:** Allows the user to modify the default short break duration.

4.  **Automatic Transition:**
    * The app should automatically transition from work to break intervals (and vice-versa) upon completion. *(Implementation TBC)*

## Future Goals (Post-MVP)

* Implementation of Long Breaks after a set number of Pomodoro cycles.
* Notifications upon interval completion.
* Customizable sounds.
* Session statistics.

---

*This document outlines the core features planned for the initial version of the application.*