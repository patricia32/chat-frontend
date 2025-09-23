import { View, StyleSheet } from "react-native";

import ChatsList from "../components/ChatsList";

function Chats({route}){

    const currentUserId = route.params.currentUserId;
    
    return(
        <View style={styles.mainContainer}>
            <ChatsList currentUserId={currentUserId}/>
        </View>
    )
}
export default Chats;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    }
})