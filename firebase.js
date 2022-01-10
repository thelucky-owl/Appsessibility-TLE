import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ4HW6r91u7m8G6oC42KMMgkpyb6Vx8BI",
  authDomain: "reactnativefirebase-d5fb6.firebaseapp.com",
  projectId: "reactnativefirebase-d5fb6",
  storageBucket: "reactnativefirebase-d5fb6.appspot.com",
  messagingSenderId: "620175508272",
  appId: "1:620175508272:web:a46093feb6c39debebbef5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const db = getFirestore(app);

export { auth };