import ChatBubble from "react-native-chat-bubble";
import { Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

function MessageBullet(){
    return(
        <GiftedChat
            messages={[]}
            user={{
                _id: 1, // current user ID
            }}
            // Disable typing, input, and sending
            renderInputToolbar={() => null}
            isTyping={false}
            showUserAvatar={true}
        />
    );
}
export default MessageBullet;