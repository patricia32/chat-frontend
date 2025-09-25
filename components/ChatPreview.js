import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useCallback } from "react";

import { getLastMessageAndDateForChat, getUserById } from "../database/firebaseService";
import { formatChatTimestamp } from "../utils/DataProcessing";
import { colors } from "../utils/styles";

function ChatPreview({currentUserId, conversationData}){
    
    const [lastMessageContent, setLastMessageContent] = useState("");
    const [loading, setLoading] = useState(true); 

    const navigation = useNavigation();
    function handlePressedChat(){
        navigation.navigate('ChatScreen',{
            currentUserId: currentUserId,
            chatId: conversationData.id,
            secondUserName: secondUserData.name,
            secondUserAvatar: secondUserData.avatar
        })
    }
    const [secondUserData, setSecondUserData] = useState(null);

    useFocusEffect(
    useCallback(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const userData = await getUserById(
                    conversationData.user1 === currentUserId
                        ? conversationData.user2
                        : conversationData.user1 
                    );
                setSecondUserData(userData);

                const lastMessage = await getLastMessageAndDateForChat(conversationData.id);
                setLastMessageContent(lastMessage.text);
                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        fetchData();
    }, [])
)
    if(loading === false)
    return(
        <Pressable 
            onPress={handlePressedChat}
            style={({pressed}) => [
                styles.mainContainer,
                pressed ? styles.chatPressed : null
            ]}>
             <View>
                <Image
                    source={
                        secondUserData.avatar === 'defaultImage'
                            ?
                            require('../assets/profilePicture.png')
                            :
                            { uri: secondUserData.avatar }
                    }
                    style={styles.userPhoto}
                />
            </View>

            <View style={styles.contentContainer}>
                <Text style={conversationData.read === false ? styles.nameTextUnread : styles.nameTextRead}>
                    {secondUserData.name}
                </Text>
           
                <Text style={conversationData.read === false ? styles.messageTextUnread : styles.messageTextRead}>
                    {lastMessageContent}
                </Text>
            </View>

            <View>
                <Text style={conversationData.read === false ? styles.dateUnread : styles.dateRead}>
                    { conversationData.date ? null : formatChatTimestamp(conversationData.date.toDate())}
                </Text>
            </View>
        </Pressable>
    )
}
export default ChatPreview;

const styles = StyleSheet.create({
    mainContainer:{
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray200,
        padding: 10,
        borderRadius: 5
    },
    chatPressed:{
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        borderTopColor: colors.gray200,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray200,
        padding: 10,
        backgroundColor: colors.gray200,
        borderRadius: 5
        
    },
    userPhoto:{
        borderRadius: 50,
        height: 50,
        width: 50,
    },
    contentContainer:{
        flex: 1,
        marginLeft: 10,
        marginTop: 5,
    },
    nameTextRead:{
        fontWeight: 600,
        fontSize: 18,
        color: colors.gray900,
        marginBottom: 2
    },
    messageTextRead: {
        fontSize: 16,
        fontWeight: 300,
        color: colors.gray800,
    },
    dateRead:{
        fontSize: 12,
        color: colors.gray800,
    },

    nameTextUnread:{
        fontWeight: 600,
        fontSize: 18,
        color: colors.purple500,
        marginBottom: 2
    },
    messageTextUnread: {
        fontWeight: 300,
        fontSize: 16,
        color: colors.purple500,
    },
    dateUnread:{
        fontWeight: 600,
        fontSize: 12,
        color: colors.purple500,
    }

})