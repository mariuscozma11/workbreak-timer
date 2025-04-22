import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
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
            <View style={styles.modalContent}>
            <Text style={{ padding: 20, textAlign: 'center', fontSize: 18 }}>
                Setări
            </Text>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button, styles.saveButton]} 
                    onPress={onClose} 
                    activeOpacity={0.7} 
                >
                    <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
                </TouchableOpacity>

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
    borderWidth: 1,
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