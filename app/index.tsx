import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TimerProvider } from '@/context/TimerContext';
import AppContent from '@/components/AppContent';

export default function Home() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <TimerProvider>
          <AppContent />
        </TimerProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}