import React from 'react';
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
}

const SettingsModal = ({ visible, onClose }: SettingsModalProps) => {
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
            {/* Contentul modalului */}
            <View style={styles.modalContent}>
              <Text style={{ padding: 20, fontWeight: 'bold', textAlign: 'center', fontSize: 24 }}>
                  Settings
              </Text>
              <Text style={styles.sectionTitle}>Work time</Text>
              {/* Caseta input work time */}
              <View style={styles.inputcontainer}>
                <TextInput
                  style={styles.input}
                  placeholder="HH"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                /><Text style={styles.separator}>:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                /><Text style={styles.separator}>:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="SS"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                />
              </View>
              <Text style={styles.sectionTitle}>Short break time</Text>
              {/* Caseta input break time */}
              <View style={styles.inputcontainer}>
                <TextInput
                  style={styles.input}
                  placeholder="MM"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                /><Text style={styles.separator}>:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="SS"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
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
                /><Text style={styles.separator}>:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="SS"
                  keyboardType="numeric"
                  placeholderTextColor= "gray"
                  textAlign="center"
                />
                
              </View>

              {/* Cutie cu butoane */}
              <View style={styles.container}>
                  {/* Buton de save */}
                  <TouchableOpacity
                      style={[styles.button, styles.saveButton]} 
                      onPress={onClose} 
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