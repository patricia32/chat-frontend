import { View, Text, StyleSheet } from "react-native";
import ChatsList from "../components/ChatsList";
function Chats(){

    return(
        <View style={styles.mainContainer}>
            <ChatsList/>

        </View>
    )
}
export default Chats;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        
    }
})