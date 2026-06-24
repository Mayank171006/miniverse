import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWW-W9cAQeoHvw8DhSFOInUyKyXflHBWE",
  authDomain: "miniverse-f6021.firebaseapp.com",
  projectId: "miniverse-f6021",
  storageBucket: "miniverse-f6021.firebasestorage.app",
  messagingSenderId: "95193756706",
  appId: "1:95193756706:web:e71d1a7327d8357ad8c67b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db=getFirestore(app);