import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Clipboard,
} from 'react-native';
import { colors } from '../utils/styles';

function MessageModal({ showModal, setShowModal, selectedMessage, handleDeleteMessage }) {
  if (!showModal || !selectedMessage) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
            <Text style={[
                styles.senderName,
                {
                alignSelf: selectedMessage.user.name === 'You' ? 'flex-end' : 'flex-start',
                color: selectedMessage.user.name === 'You' ? colors.purple400 : '#333',
                }
            ]}>
                {selectedMessage.user.name}
            </Text>
          {/* Chat Bubble */}
          <View style={[
                styles.bubble, 
                {backgroundColor: selectedMessage.user.name === 'You' ? colors.purple400 : colors.gray100}
          ]}>
            <Text style={[
                styles.bubbleText,
                {color:selectedMessage.user.name === 'You' ? 'white' : 'black'}
            ]}>
                {selectedMessage.text}</Text>
          </View>

          {/* Copy */}
          <Pressable
            onPress={() => {
              Clipboard.setString(selectedMessage.text);
              setShowModal(false);
            }}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              styles.borderBottom,
            ]}
          >
            <Text style={styles.buttonText}>📋 Copy </Text>
          </Pressable>

          {/* Delete */}
          <Pressable
            onPress={() => {
              handleDeleteMessage(selectedMessage._id);
              setShowModal(false);
            }}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              styles.borderBottom,
            ]}
          >
            <Text style={styles.buttonText}>🗑️ Delete</Text>
          </Pressable>

          {/* Cancel */}
          <Pressable
            onPress={() => setShowModal(false)}
            style={({ pressed }) => [
              styles.button,
              styles.cancelButton,
              pressed && styles.cancelPressed,
            ]}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default MessageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  senderName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    },
  bubble: {
    width: '90%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  bubbleText: {
    fontSize: 16,
  },
  button: {
    width: '60%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    
  },
  buttonPressed: {
    backgroundColor: '#f2f2f2',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonText: {
    alignSelf: 'center',
    color: colors.purple500,
    fontSize: 16,
  },
  cancelButton: {
    borderRadius: 8,
    marginTop: 10,
  },
  cancelPressed: {
    backgroundColor: '#fcecec',
  },
  cancelText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
