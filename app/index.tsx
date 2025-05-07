import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity} from "react-native";
import Timer from "./components/timer";
import { Settings } from "lucide-react-native";
import SettingsModal from './components/settingsmodal';
import React, { useState } from "react";
import { TimerProvider, useTimerContext } from './context/TimerContext'; 

//Main Component
const AppContent = () => {
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const { setWorkDuration, workDuration, setBreakDuration, breakDuration, setLongBreakDuration, longBreakDuration} = useTimerContext();
  const handleOpenSettings = () => { setIsSettingsModalVisible(true); };
  const handleCloseSettings = () => { setIsSettingsModalVisible(false); };
  
  const handleSaveSettings = (settings: { work: number; short: number; long: number }) => {
    setWorkDuration(settings.work);
    setBreakDuration(settings.short);
    setLongBreakDuration(settings.long);
  };
  

  return (
    <SafeAreaView style={styles.screenContainer}>

      <View style={styles.content}>
        <Timer />
      </View>

      <TouchableOpacity style={styles.fab} onPress={handleOpenSettings} activeOpacity={0.8}>
        <Settings color="#FFFFFF" size={28} />
      </TouchableOpacity>

      <SettingsModal
        visible={isSettingsModalVisible}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
        initialWorkDuration={workDuration}
        initialBreakDuration={breakDuration}
        initialLongBreakDuration={longBreakDuration}
      />

    </SafeAreaView>
  );
}


const App = () => {
  return (
    <TimerProvider>
      <AppContent />
    </TimerProvider>
  );
};


export default App;

//StyleSheet
const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fab: {
    position: 'absolute', right: 25, bottom: 25, width: 60, height: 60,
    borderRadius: 30, backgroundColor: '#000', justifyContent: 'center',
    alignItems: 'center', elevation: 8, shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4,
  },
});