import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Settings } from 'lucide-react-native';
import Timer from './Timer';
import SettingsModal from './SettingsModal';

export default function AppContent() {
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Timer />
      
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setSettingsVisible(true)}
        activeOpacity={0.8}
      >
        <Settings size={24} color="white" />
      </TouchableOpacity>
      
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  settingsButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#64748B',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});