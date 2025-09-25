import { doc, getDoc, getDocs, setDoc, collection, query, where, orderBy, limit, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, "user", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

  export const getConversationsForUser = async (currentUserId) => {
    try {
      const conversationsRef = collection(db, "chat");

      const q1 = query(conversationsRef, where("user1", "==", currentUserId));
      const q2 = query(conversationsRef, where("user2", "==", currentUserId));

      const [snapshot1, snapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
      ]);

      const conversations = [];

      snapshot1.forEach((doc) => {
        conversations.push({ id: doc.id, ...doc.data() });
      });

      snapshot2.forEach((doc) => {
        conversations.push({ id: doc.id, ...doc.data() });
      });

      return conversations;
    } catch (error) {
      console.error("Error getting conversations:", error);
      return [];
    }
};

export const getLastMessageAndDateForChat = async (chatId) => {
  try {
    const messagesRef = collection(db, "message");
    const q = query(messagesRef, where("chat_id", "==", chatId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate?.() || null,
      };
    });

    const validMessages = messages.filter((msg) => msg.createdAt !== null);

    if (validMessages.length === 0) return null;

    validMessages.sort((a, b) => b.createdAt - a.createdAt);

    return {
      createdAt: validMessages[0].createdAt,
      text: validMessages[0].text || "",
    };
  } catch (error) {
    console.error("Error getting last message:", error);
    return null;
  }
};


export const getMessagesForChat = async (chatId) => {
    try {
      const messagesRef = collection(db, "message");
      const q = query(messagesRef, where("chat_id", "==", chatId));
      const snapshot = await getDocs(q);

      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      
      return messages;

    } catch (error) {
      console.error("Error getting messages:", error);
      return [];
    }
  }

export const sendMessage = async (newMessage) => {
  try {
    const messageRef = doc(db, "message", newMessage._id);
    await setDoc(messageRef, newMessage);
    return true;

  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
};

export const updateChatTimestamp = async (chatId, timestamp) => {
  try {
    const chatRef = doc(db, "chat", chatId);
    await updateDoc(chatRef, {
      date: timestamp
    });
    return true;
  } catch (error) {
    console.error("Error updating chat timestamp:", error);
    return false;
  }
};
export const deleteMessageById = async (messageId, chatId) => {
  try {
    const messageRef = doc(db, "message", messageId);
    await deleteDoc(messageRef);

    const lastMessage = await getLastMessageAndDateForChat(chatId);

    if (!lastMessage || !lastMessage.createdAt) {
      await updateChatTimestamp(chatId, null);
      return true;
    }

    const lastMessageDate = new Date(lastMessage.createdAt);
    await updateChatTimestamp(chatId, lastMessageDate);

    return true;
  } catch (error) {
    console.error("Error updating chat timestamp:", error);
    return false;
  }
};
