import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { X, Check } from 'lucide-react-native';
import { useTimerContext } from '@/context/TimerContext';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const {
    workDuration,
    breakDuration,
    longBreakDuration,
    cyclesBeforeLongBreak,
    setWorkDuration,
    setBreakDuration,
    setLongBreakDuration,
    setCyclesBeforeLongBreak,
  } = useTimerContext();

  // Local state for inputs
  const [workMinutes, setWorkMinutes] = useState('');
  const [workSeconds, setWorkSeconds] = useState('');
  const [breakMinutes, setBreakMinutes] = useState('');
  const [breakSeconds, setBreakSeconds] = useState('');
  const [longBreakMinutes, setLongBreakMinutes] = useState('');
  const [longBreakSeconds, setLongBreakSeconds] = useState('');
  const [cycles, setCycles] = useState('');

  // Initialize inputs with current values from context
  useEffect(() => {
    if (visible) {
      // Work duration
      setWorkMinutes(Math.floor(workDuration / 60).toString());
      setWorkSeconds((workDuration % 60).toString().padStart(2, '0'));
      
      // Break duration
      setBreakMinutes(Math.floor(breakDuration / 60).toString());
      setBreakSeconds((breakDuration % 60).toString().padStart(2, '0'));
      
      // Long break duration
      setLongBreakMinutes(Math.floor(longBreakDuration / 60).toString());
      setLongBreakSeconds((longBreakDuration % 60).toString().padStart(2, '0'));
      
      // Cycles
      setCycles(cyclesBeforeLongBreak.toString());
    }
  }, [visible, workDuration, breakDuration, longBreakDuration, cyclesBeforeLongBreak]);

  const handleSave = () => {
    // Parse and validate work duration
    const parsedWorkMinutes = parseInt(workMinutes) || 0;
    const parsedWorkSeconds = parseInt(workSeconds) || 0;
    const newWorkDuration = (parsedWorkMinutes * 60) + parsedWorkSeconds;
    setWorkDuration(newWorkDuration > 0 ? newWorkDuration : 25 * 60);
    
    // Parse and validate break duration
    const parsedBreakMinutes = parseInt(breakMinutes) || 0;
    const parsedBreakSeconds = parseInt(breakSeconds) || 0;
    const newBreakDuration = (parsedBreakMinutes * 60) + parsedBreakSeconds;
    setBreakDuration(newBreakDuration > 0 ? newBreakDuration : 5 * 60);
    
    // Parse and validate long break duration
    const parsedLongBreakMinutes = parseInt(longBreakMinutes) || 0;
    const parsedLongBreakSeconds = parseInt(longBreakSeconds) || 0;
    const newLongBreakDuration = (parsedLongBreakMinutes * 60) + parsedLongBreakSeconds;
    setLongBreakDuration(newLongBreakDuration > 0 ? newLongBreakDuration : 15 * 60);
    
    // Parse and validate cycles
    const parsedCycles = parseInt(cycles) || 0;
    setCyclesBeforeLongBreak(parsedCycles > 0 ? parsedCycles : 4);
    
    onClose();
  };

  // Input validation helpers
  const validateMinutesInput = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const parsed = parseInt(text);
    if (text === '' || (parsed >= 0 && parsed <= 99)) {
      setter(text);
    }
  };

  const validateSecondsInput = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const parsed = parseInt(text);
    if (text === '' || (parsed >= 0 && parsed <= 59)) {
      setter(text);
    }
  };

  const validateCyclesInput = (text: string) => {
    const parsed = parseInt(text);
    if (text === '' || (parsed >= 1 && parsed <= 20)) {
      setCycles(text);
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingView}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Timer Settings</Text>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                  >
                    <X size={24} color="#64748B" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView}>
                  <View style={styles.inputSection}>
                    <Text style={styles.sectionTitle}>Work Duration</Text>
                    <View style={styles.timeInputContainer}>
                      <View style={styles.timeField}>
                        <TextInput
                          style={styles.timeInput}
                          keyboardType="number-pad"
                          value={workMinutes}
                          onChangeText={(text) => validateMinutesInput(text, setWorkMinutes)}
                          placeholder="25"
                          maxLength={2}
                        />
                        <Text style={styles.timeLabel}>MIN</Text>
                      </View>

                      <Text style={styles.timeSeparator}>:</Text>

                      <View style={styles.timeField}>
                        <TextInput
                          style={styles.timeInput}
                          keyboardType="number-pad"
                          value={workSeconds}
                          onChangeText={(text) => validateSecondsInput(text, setWorkSeconds)}
                          placeholder="00"
                          maxLength={2}
                        />
                        <Text style={styles.timeLabel}>SEC</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.inputSection}>
                    <Text style={styles.sectionTitle}>Break Duration</Text>
                    <View style={styles.timeInputContainer}>
                      <View style={styles.timeField}>
                        <TextInput
                          style={styles.timeInput}
                          keyboardType="number-pad"
                          value={breakMinutes}
                          onChangeText={(text) => validateMinutesInput(text, setBreakMinutes)}
                          placeholder="5"
                          maxLength={2}
                        />
                        <Text style={styles.timeLabel}>MIN</Text>
                      </View>

                      <Text style={styles.timeSeparator}>:</Text>

                      <View style={styles.timeField}>
                        <TextInput
                          style={styles.timeInput}
                          keyboardType="number-pad"
                          value={breakSeconds}
                          onChangeText={(text) => validateSecondsInput(text, setBreakSeconds)}
                          placeholder="00"
                          maxLength={2}
                        />
                        <Text style={styles.timeLabel}>SEC</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.inputSection}>
                    <Text style={styles.sectionTitle}>Long Break Duration</Text>
                    <View style={styles.timeInputContainer}>
                      <View style={styles.timeField}>
                        <TextInput
                          style={styles.timeInput}
                          keyboardType="number-pad"
                          value={longBreakMinutes}
                          onChangeText={(text) => validateMinutesInput(text, setLongBreakMinutes)}
                          placeholder="15"
                          maxLength={2}
                        />
                        <Text style={styles.timeLabel}>MIN</Text>
                      </View>

                      <Text style={styles.timeSeparator}>:</Text>

                      <View style={styles.timeField}>
                        <TextInput
                          style={styles.timeInput}
                          keyboardType="number-pad"
                          value={longBreakSeconds}
                          onChangeText={(text) => validateSecondsInput(text, setLongBreakSeconds)}
                          placeholder="00"
                          maxLength={2}
                        />
                        <Text style={styles.timeLabel}>SEC</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.inputSection}>
                    <Text style={styles.sectionTitle}>Cycles Before Long Break</Text>
                    <View style={styles.cyclesInputContainer}>
                      <TextInput
                        style={styles.cyclesInput}
                        keyboardType="number-pad"
                        value={cycles}
                        onChangeText={validateCyclesInput}
                        placeholder="4"
                        maxLength={2}
                      />
                      <Text style={styles.cyclesLabel}>CYCLES</Text>
                    </View>
                  </View>
                </ScrollView>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                  activeOpacity={0.7}
                >
                  <Check size={24} color="white" />
                  <Text style={styles.saveButtonText}>Save Settings</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    width: '100%',
    maxWidth: 420,
    marginHorizontal: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    marginBottom: 16,
  },
  inputSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 12,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeField: {
    alignItems: 'center',
  },
  timeInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 12,
    width: 80,
    textAlign: 'center',
    fontSize: 24,
    color: '#1E293B',
    fontWeight: '500',
  },
  timeLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  timeSeparator: {
    fontSize: 28,
    marginHorizontal: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  cyclesInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cyclesInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 12,
    width: 80,
    textAlign: 'center',
    fontSize: 24,
    color: '#1E293B',
    fontWeight: '500',
  },
  cyclesLabel: {
    marginLeft: 12,
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#2DD4BF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});