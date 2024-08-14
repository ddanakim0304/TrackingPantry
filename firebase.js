import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6kZkPTvvHXuztAJECs2xTsl47RyNPoYo",
  authDomain: "pantryapp-d6e29.firebaseapp.com",
  projectId: "pantryapp-d6e29",
  storageBucket: "pantryapp-d6e29.appspot.com",
  messagingSenderId: "558344822906",
  appId: "1:558344822906:web:9971c3805cadccb4ed9bc3",
  measurementId: "G-9T6VY3D4NG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {app, firebaseConfig, firestore}