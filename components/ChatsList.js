import { StyleSheet, FlatList } from "react-native";
import { useState, useLayoutEffect } from "react";

import LoadingScreen from "../screens/LoadingScreen";
import ChatPreview from "./ChatPreview";

import { getUserById, getConversationsForUser } from "../database/firebaseService";

function ChatsList({currentUserId}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [conversations, setConversations] = useState([]);
    
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserById(currentUserId);
                setUser(userData);

                const conversationsFetched = await getConversationsForUser(currentUserId);
                setConversations(conversationsFetched);

                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
                setLoading(false);
            }
        };

        fetchData();
        }, []);    

    
    if(loading)
        return (<LoadingScreen/>)
    
    return(

        <FlatList
            style={styles.mainContainer}
            data={conversations}
            renderItem={(conversationData) => {
                return <ChatPreview currentUserId={currentUserId} conversationData={conversationData.item}/>
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