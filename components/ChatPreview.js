import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { colors } from "../utils/styles";
import { useNavigation } from "@react-navigation/native";

function ChatPreview({chatPreviewData}){
    
    const navigation = useNavigation();

    function handlePressedChat(){
        navigation.navigate("ChatScreen",{
            userName: chatPreviewData.userName,
        })
    }

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
                        chatPreviewData.userPhoto 
                        ?
                            { uri: chatPreviewData.userPhoto }
                        :
                            require('../assets/profilePicture.png')
                    }
                    style={styles.userPhoto}
                />
            </View>

            <View style={styles.contentContainer}>
                <Text style={chatPreviewData.read === false ? styles.nameTextUnread : styles.nameTextRead}>
                    {chatPreviewData.userName}
                </Text>
           
                <Text style={chatPreviewData.read === false ? styles.messageTextUnread : styles.messageTextRead}>
                    {chatPreviewData.chatLastMessage}
                </Text>
            </View>

            <View>
                <Text style={chatPreviewData.read === false ? styles.dateUnread : styles.dateRead}>
                    {chatPreviewData.date}
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
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.gray900,
        marginBottom: 2
    },
    messageTextRead: {
        fontSize: 16,
        color: colors.gray800,
    },
    dateRead:{
        fontSize: 12,
        color: colors.gray800,
    },

    nameTextUnread:{
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.purple500,
        marginBottom: 2
    },
    messageTextUnread: {
        // fontWeight: 'bold',
        fontSize: 16,
        color: colors.purple500,
    },
    dateUnread:{
        fontWeight: 'bold',
        fontSize: 12,
        color: colors.purple500,
    }

})