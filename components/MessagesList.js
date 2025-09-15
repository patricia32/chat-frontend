import { GiftedChat } from "react-native-gifted-chat";

function MessagesList({messages}){
    return(
        <GiftedChat
            messages={messages}
            user={{
                _id: 1, // current user ID
            }}
            // Disable typing, input, and sending
            renderInputToolbar={() => null}
            isTyping={false}
            showUserAvatar={true}
        />
    )
}
export default MessagesList;