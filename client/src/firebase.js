// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "your-blog-3c190.firebaseapp.com",
    projectId: "your-blog-3c190",
    storageBucket: "your-blog-3c190.firebasestorage.app",
    messagingSenderId: "673149808040",
    appId: "1:673149808040:web:bb92d5207153ef94a3019d"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
