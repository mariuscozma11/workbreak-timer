import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity} from "react-native";
import Timer from "./components/timer";
import { Settings } from "lucide-react-native";
import SettingsModal from './components/settingsmodal';
import React, { useState } from "react";

//Main Component
export default function Index() {
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const handleOpenSettings = () => {
    setIsSettingsModalVisible(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Timer />
      <TouchableOpacity
        style={styles.fab}
        onPress={handleOpenSettings}
        activeOpacity={0.8}>
        <Settings color="#FFFFFF" size={28} />
      </TouchableOpacity>
      <SettingsModal
        visible={isSettingsModalVisible} // Trimitem starea de vizibilitate
        onClose={handleCloseSettings}     // Trimitem funcția de închidere
      />
    </SafeAreaView>
  );
}

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