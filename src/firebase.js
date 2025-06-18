// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDXzGXLPLc-wP8buV_wXiRHWJOjSwMIxtU",
  authDomain: "booking-c8db3.firebaseapp.com",
  projectId: "booking-c8db3",
  storageBucket: "booking-c8db3.firebasestorage.com",
  messagingSenderId: "855088700926",
  appId: "1:855088700926:web:fa3b95bf9841e53d7534af"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };
