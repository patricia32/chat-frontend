import { View, Text, TextInput , Platform, StyleSheet, Pressable} from 'react-native';
import { GiftedChat, Bubble, Avatar } from 'react-native-gifted-chat';
import { useState, useLayoutEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { getMessagesForChat, sendMessage } from '../database/firebaseService';
import LoadingScreen from './LoadingScreen';
import {colors} from '../utils/styles'

export default function ChatScreen({route, navigation}) {
  
    const currentUserId = route.params.currentUserId;
    const chatId = route.params.chatId;
    const secondUserName = route.params.secondUserName;
    const secondUserAvatar = route.params.secondUserAvatar;
    
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sentToggle, setSentToggle] = useState(false);
    
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
    }, [navigation, sentToggle]);


        // use Gifted Chat message structure
    const giftedMessages = messages.map(msg => ({
        _id: msg.id,
        text: msg.text,
        createdAt: msg.createdAt?.toDate?.() || new Date(), 
        user: {
            _id: msg.sender_id,
            name: msg.sender_id === currentUserId ? "You" : "Other User",
            avatar: msg.sender_id === currentUserId 
                ? null 
                : secondUserAvatar
        }
    }));

  const handleSend = async () => {
    if (inputText.trim().length > 0) {
      const newMessage = {
        _id: Math.random().toString(36).substring(7), // Unique id
        chat_id: chatId,
        text: inputText.trim(),
        createdAt: new Date(),
        sender_id: currentUserId
      };

      setInputText("");
      await sendMessage(newMessage);
      setSentToggle(!sentToggle)
    }
  };

  if(loading)
    return(
        <LoadingScreen/>
    )
  return (
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
                    return <Avatar {...props} rounded size={40} />;
                }}

                renderBubble={(props) => (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: colors.purple400,
                                paddingHorizontal: 5
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
                )}
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