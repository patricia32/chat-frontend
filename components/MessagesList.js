import { GiftedChat } from "react-native-gifted-chat";

import { View, TextInput, Button } from "react-native";
function MessagesList({messages}){
    return(
        <View>
            <GiftedChat
                messages={messages}
                user={{ _id: 1 }}
                renderInputToolbar={() => null} // disables the default input
            />

            <View >
                <TextInput
                   
                    placeholder="Type your message here..."
                   
                />
                <Button title="Send" />
            </View>
        </View>
    )
}
export default MessagesList;