import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQKw9G5jmXK8tFL3uJxL8nqv9KMPAYFG4",
  authDomain: "store-8692f.firebaseapp.com",
  projectId: "store-8692f",
  storageBucket: "store-8692f.appspot.com",
  messagingSenderId: "33011678012",
  appId: "1:33011678012:web:e06bb8a742867193dfbc39",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
