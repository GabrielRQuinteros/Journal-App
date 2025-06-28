import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxtI39A25TgXubTW8f-rAD4SwpNcckroc",
  authDomain: "react-cursos-94e44.firebaseapp.com",
  projectId: "react-cursos-94e44",
  storageBucket: "react-cursos-94e44.firebasestorage.app",
  messagingSenderId: "936693648464",
  appId: "1:936693648464:web:788c04640fed78778f1555",
  measurementId: "G-Z5JRMGHLL9"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firebaseAuth: Auth = getAuth(firebaseApp);
export const firebaseDB: Firestore = getFirestore( firebaseApp );