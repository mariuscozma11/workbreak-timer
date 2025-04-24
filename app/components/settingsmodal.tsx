import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput
} from 'react-native';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: { work: number; short: number; long: number }) => void;
  initialWorkDuration?: number;
  initialBreakDuration?: number;
  initialLongBreakDuration?: number;
}

//HMS converter
const secondsToHMS = (totalSeconds: number) => {
  totalSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
      m: String(minutes).padStart(2, '0'),
      s: String(seconds).padStart(2, '0'),
  };
};


const SettingsModal = ({ visible, onClose, onSave, initialWorkDuration, initialBreakDuration, initialLongBreakDuration }: SettingsModalProps) => {

  const initialWHMS = secondsToHMS(initialWorkDuration ?? 0);
  const initialSWHMS = secondsToHMS(initialBreakDuration ?? 0);
  const initialLWHMS = secondsToHMS(initialLongBreakDuration ?? 0);
  const [workMinutesInput, setWorkMinutesInput] = useState(initialWHMS.m);
  const [workSecondsInput, setWorkSecondsInput] = useState(initialWHMS.s);
  const [breakMinutesInput, setBreakMinutesInput] = useState(initialSWHMS.m);
  const [breakSecondsInput, setBreakSecondsInput] = useState(initialSWHMS.s);
  const [longBreakMinutesInput, setLongBreakMinutesInput] = useState(initialLWHMS.m);
  const [longBreakSecondsInput, setLongBreakSecondsInput] = useState(initialLWHMS.s);

  useEffect(() => {
    if (visible) {
      const whms = secondsToHMS(initialWorkDuration ?? 0);
      setWorkMinutesInput(whms.m);
      setWorkSecondsInput(whms.s);
      const shms = secondsToHMS(initialBreakDuration ?? 0);
      setBreakMinutesInput(shms.m);
      setBreakSecondsInput(shms.s);
      const lhms = secondsToHMS(initialLongBreakDuration ?? 0);
      setLongBreakMinutesInput(lhms.m);
      setLongBreakSecondsInput(lhms.s);
    }
  }, [visible, initialWorkDuration, initialBreakDuration, initialLongBreakDuration]);

  const handleSave = () => {
    const workM = parseInt(workMinutesInput, 10) || 0;
    const workS = parseInt(workSecondsInput, 10) || 0;
    const totalWorkSeconds = (workM * 60) + workS;

    const breakM = parseInt(breakMinutesInput, 10) || 0;
    const breakS = parseInt(breakSecondsInput, 10) || 0;
    const totalBreakSeconds = (breakM * 60) + breakS;

    const longbreakM = parseInt(longBreakMinutesInput, 10) || 0;
    const longbreakS = parseInt(longBreakSecondsInput, 10) || 0;
    const totalLongBreakSeconds = (longbreakM * 60) + longbreakS;
    onSave({
      work: totalWorkSeconds,
      short: totalBreakSeconds,
      long: totalLongBreakSeconds
    });
    onClose();
  };

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose} 
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {/* Modal content */}
            <View style={styles.modalContent}>
              <Text style={{ padding: 20, fontWeight: 'bold', textAlign: 'center', fontSize: 24 }}>
                  Settings
              </Text>
              <Text style={styles.sectionTitle}>Work time</Text>
              {/* Work time input box */}
              <View style={styles.inputcontainer}>
                <TextInput
                  style={styles.input}
                  placeholder="MM"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                  value={workMinutesInput}
                  onChangeText={setWorkMinutesInput}
                /><Text style={styles.separator}>:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="SS"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                  value={workSecondsInput}
                  onChangeText={setWorkSecondsInput}
                />
              </View>
              <Text style={styles.sectionTitle}>Short break time</Text>
              {/* Break time input box */}
              <View style={styles.inputcontainer}>
                <TextInput
                  style={styles.input}
                  placeholder="MM"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                  value={breakMinutesInput}
                  onChangeText={setBreakMinutesInput}
                /><Text style={styles.separator}>:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="SS"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                  value={breakSecondsInput}
                  onChangeText={setBreakSecondsInput}
                />
                
              </View>

              <Text style={styles.sectionTitle}>Long break time</Text>
              {/* Caseta input break time */}
              <View style={styles.inputcontainer}>
                <TextInput
                  style={styles.input}
                  placeholder="MM"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                  value={longBreakMinutesInput}
                  onChangeText={setLongBreakMinutesInput}
                /><Text style={styles.separator}>:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="SS"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                  value={longBreakSecondsInput}
                  onChangeText={setLongBreakSecondsInput}
                />
                
              </View>

              {/* Cutie cu butoane */}
              <View style={styles.container}>
                  {/* Buton de save */}
                  <TouchableOpacity
                      style={[styles.button, styles.saveButton]} 
                      onPress={() => {
                        handleSave()
                     }}
                      activeOpacity={0.7} 
                  >
                      <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
                  </TouchableOpacity>
                  {/* Buton de oprire */}
                  <TouchableOpacity
                      style={[styles.button, styles.closeButton]} 
                      onPress={onClose} 
                      activeOpacity={0.7} 
                  >
                      <Text style={[styles.buttonText, styles.closeButtonText]}>Close</Text>
                  </TouchableOpacity>
              </View>
              
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


const styles = StyleSheet.create({
sectionTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 8,
},
separator: {
  fontWeight: 'bold',
  fontSize: 18,
  marginHorizontal: 2,
  textAlign: 'center',
  lineHeight: 40,
},
input: {
  width: '35%',
  padding: 10,
  borderColor: 'gray',
  marginHorizontal: 5,
  borderWidth: 2,
  borderRadius: 5,
  
},
inputcontainer:{
  flexDirection: 'row',
  justifyContent: 'center',
  textAlign: 'center',
  paddingBottom: 10,
  paddingHorizontal: 10,
  width: '60%',
},
container: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 10, 
    paddingHorizontal: 10, 
    width: '100%',
  },
  button: {
    paddingVertical: 10, 
    paddingHorizontal: 25, 
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center', 
    minWidth: 100, 
  },
  saveButton: {
    backgroundColor: 'white', 
    borderColor: '#4CAF50',
  },
  closeButton: {
    backgroundColor: 'white', 
    borderColor: '#F44336', 
  },
  buttonText: {
    fontSize: 16, 
    fontWeight: 'bold', 
  },
  saveButtonText: {
    color: '#4CAF50',
  },
  closeButtonText: {
    color: '#F44336',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    paddingTop: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
  },
});

export default SettingsModal;