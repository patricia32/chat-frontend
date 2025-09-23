// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrh0SNAtq0fdQvWLFaekEGuqtl2pwZ6N0",
  authDomain: "chat-81206.firebaseapp.com",
  databaseURL: "https://chat-81206-default-rtdb.firebaseio.com",
  projectId: "chat-81206",
  storageBucket: "chat-81206.firebasestorage.app",
  messagingSenderId: "521802652686",
  appId: "1:521802652686:web:14e8d88a5dc926043cf05f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };