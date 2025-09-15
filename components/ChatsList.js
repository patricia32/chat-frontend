import { View, StyleSheet, FlatList } from "react-native";
import ChatPreview from "./ChatPreview";
// import { FlatList } from "react-native/types_generated/index";

function ChatsList(){

    const chats =[
        {
            chat_id: 1,
            chatLastMessage: 'Hello!',
            userName: 'John',
            userPhoto: undefined,
            date: 'Today',
            read: false,
        },
        {
            chat_id: 2,
            chatLastMessage: 'Have a nice day!',
            userName: 'Mary',
            userPhoto: undefined,
            date: 'Thursday',
            read: true
        },
        {
            chat_id: 3,
            chatLastMessage: 'Hi there. What\'s up?',
            userName: 'Jessica',
            userPhoto: undefined,
            date: 'Wednesday',
            read: false
        }
           
    ]

    return(
        <FlatList
            style={styles.mainContainer}
            data={chats}
            renderItem={(itemData) => {
                return <ChatPreview key={itemData.item.chat_id} chatPreviewData={itemData.item}/>
            }}
        />
    )
}
export default ChatsList;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        padding: 8,
    }
})