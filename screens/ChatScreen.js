import { useLayoutEffect, useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { colors } from '../utils/styles'

import MessagesList from "../components/MessagesList";

function ChatScreen({route, navigation}){
    const userName = route.params.userName;
    const [messages, setMessages] = useState([]);   
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => {
                return <Text style={styles.headerText} >{userName}</Text>;
            }
        });
    }, [navigation, userName]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    return(
        
            <>
            <View style={styles.messagesContainer}>
                <MessagesList messages={messages}/>
            </View>
<KeyboardAvoidingView 
            style={styles.mainContainter}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // tweak this offset
        >
                <View style={styles.composeContainer}>
                    
                    <TextInput 
                        style={styles.inputField}
                        placeholder="Type a message..."
                        />
                    <Button
                        color={colors.purple500}
                        title='Send'/>
          
                </View>
                
        </KeyboardAvoidingView>
        </>
    )
}
export default ChatScreen;

const styles = StyleSheet.create({
    headerText:{
        color: colors.purple500,
        fontWeight: 'bold',
        fontSize: 22
    },
    mainContainter:{
        flex: 1,
    },
    messagesContainer:{
        flex: 9,
        backgroundColor: 'pink',
    },
    composeContainer:{
        flex: 1,
        backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginBottom: 5,
        marginHorizontal: 10
    },
    inputField:{
        height: 40,
        width: '85%',
        borderColor: colors.gray700,
        borderWidth: 0.3,
        borderRadius: 15
    }
})