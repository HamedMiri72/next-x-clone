// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-clone-2705b.firebaseapp.com",
  projectId: "insta-clone-2705b",
  storageBucket: "insta-clone-2705b.firebasestorage.app",
  messagingSenderId: "132341861808",
  appId: "1:132341861808:web:c26eebb9c5f236e6701a75"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);