
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnAfuftTZ8NooHYQ5sJlRzoPLd3w3diIY",
  authDomain: "qurannoor360.firebaseapp.com",
  projectId: "qurannoor360",
  storageBucket: "qurannoor360.firebasestorage.app",
  messagingSenderId: "865746511090",
  appId: "1:865746511090:web:508015a8c53b4415d0dc6b"
};

const app = initializeApp(firebaseConfig);
// HARD RESET: Default auth, no persistence override
export const auth = getAuth(app);
export const db = getFirestore(app);
