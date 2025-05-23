// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AIzaSyDXzGXLPLc-wP8buV_wXiRHWJOjSwMIxtU",
  projectId: "booking-c8db3",
  storageBucket: "booking-c8db3.firebasestorage.app",
  messagingSenderId: "855088700926",
  appId: "1:855088700926:web:fa3b95bf9841e53d7534af"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
