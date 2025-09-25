import { ActionSheetProvider } from '@expo/react-native-action-sheet'; // or 'react-native-action-sheet'
import { View, Text, TextInput , Platform, StyleSheet, Pressable} from 'react-native';
import { GiftedChat, Bubble, Avatar } from 'react-native-gifted-chat';
import { useState, useLayoutEffect, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { deleteMessageById, getMessagesForChat, sendMessage, updateChatTimestamp } from '../database/firebaseService';
import { colors} from '../utils/styles'

import MessageModal from '../components/MessageModal';
import LoadingScreen from './LoadingScreen';

export default function ChatScreen({route, navigation}) {
  
    const currentUserId = route.params.currentUserId;
    const chatId = route.params.chatId;
    const secondUserName = route.params.secondUserName;
    const secondUserAvatar = route.params.secondUserAvatar;
    
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sentToggle, setSentToggle] = useState(false);

    const [pressedMessage, setPressedMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [inputText, setInputText] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => {
            return <Text style={styles.headerText}> {secondUserName} </Text>;
            },
        });

        const fetchData = async () => {
            try {
                const messagesData = await getMessagesForChat(chatId);
                setMessages(messagesData.sort((a, b) => b.createdAt - a.createdAt));
                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        fetchData();
    }, [navigation, sentToggle, showModal]);

        // use Gifted Chat message structure
    const giftedMessages = messages.map(msg => ({
        _id: msg.id,
        text: msg.text,
        createdAt: msg.createdAt?.toDate?.() || new Date(), 
        user: {
            _id: msg.sender_id,
            name: msg.sender_id === currentUserId ? "You" : secondUserName,
            avatar: msg.sender_id === currentUserId 
                ? null 
                : secondUserAvatar
        }
    }));

  const handleSend = async () => {
    const newDate = new Date();
    if (inputText.trim().length > 0) {
      const newMessage = {
        _id: Math.random().toString(36).substring(7), // Unique id
        chat_id: chatId,
        text: inputText.trim(),
        createdAt: newDate,
        sender_id: currentUserId
      };

      setInputText("");
      await sendMessage(newMessage);
      await updateChatTimestamp(chatId, newDate)
      setSentToggle(!sentToggle)
    }
  };

  const handleLongPressMessage = (context, message) => {
    setPressedMessage(message)
    setShowModal(true);
  }

  const handleDeleteMessage = (messageId) => {
    deleteMessageById(messageId, chatId)
    setShowModal(false);
  }
  useEffect(() => {
    }, [pressedMessage]);

  if(loading)
    return(
        <LoadingScreen/>
    )
  return (
    <ActionSheetProvider>
        <View style={styles.mainContainer}> 
            
            <View style={styles.messagesContainer}>
            <GiftedChat
                style={styles.messagesContainer}
                messages={giftedMessages}
                user={{ _id: currentUserId }}
                renderInputToolbar={() => null}
                isKeyboardInternallyHandled={false} 
                keyboardShouldPersistTaps="never" 
                bottomOffset={0} 
                scrollToBottom={false} 

                renderAvatar={(props) => {
                    return (
                         <Avatar
                            {...props}
                            source={
                                secondUserAvatar === 'defaultImage'
                                ? ('../assets/profilePicture.png')  
                                : { uri: secondUserAvatar }              
                            }
                            rounded
                            size={40}
    />
                    )
                }}

                renderBubble={(props) => {
                    return (
                        <Bubble
                            {...props}
                            onLongPress={(context) => handleLongPressMessage(context, props.currentMessage)}

                            wrapperStyle={{ 
                                right: {
                                    backgroundColor: colors.purple500,
                                    paddingHorizontal: 5,
                                },
                                left: {
                                    backgroundColor: '#F1F0F0',
                                    paddingHorizontal: 5
                                },
                            }}
                            textStyle={{
                                right: {
                                    fontSize: 16,
                                    fontWeight: 400,
                                    color: '#fff',
                                },
                                left: {
                                    fontSize: 16,
                                    fontWeight: 400,
                                    color: '#000',
                                },
                            }}
                        />
                    )
                }}
            />

            <MessageModal
                showModal={showModal}
                setShowModal={setShowModal}
                selectedMessage={pressedMessage}
                handleDeleteMessage={handleDeleteMessage}
                />

            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0}
                style={styles.composeContainer}
            >  
                <View style={styles.inputWrapper}>
                    <TextInput 
                        style={styles.inputField}
                        placeholder='Type a message ...'
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <Pressable 
                        onPress={handleSend}
                    >
                        <MaterialIcons name="send" color={colors.purple500} size={24} />
                    </Pressable>

                </View>
            </KeyboardAvoidingView>
        </View>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1, 
        marginBottom: 30,
    },
    messagesContainer:{
        flex: 1,
    },
    composeContainer: {
        flex:0.08,
        alignSelf: 'center',
        marginBottom: 0,
        marginVertical: 15,
        width: '90%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingRight: 10,
        marginHorizontal: 10,
        marginVertical: 0,
        height:45
    },
    inputField: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
    },
    headerText:{
        fontWeight: 700,
        color: colors.purple100,
        fontSize: 20
    }
})