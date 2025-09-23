import { doc, getDoc, getDocs, setDoc, collection, query, where, orderBy, limit } from "firebase/firestore";
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

export const getLastMessageForChat = async (chatId) => {
  try {
    const messagesRef = collection(db, "message");
    const q = query(messagesRef, where("chat_id", "==", chatId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return "";

    const messages = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date()
      };
    });

    messages.sort((a, b) => b.createdAt - a.createdAt);

    return messages[0].text || "";
  } catch (error) {
      console.error("Error getting last message:", error);
      return "";
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