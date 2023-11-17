import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7Nri-r3wYzcS0JNIiDNpiSzWfte8inyA",
  authDomain: "mylibrary-5bb72.firebaseapp.com",
  projectId: "mylibrary-5bb72",
  storageBucket: "mylibrary-5bb72.appspot.com",
  messagingSenderId: "1016521597048",
  appId: "1:1016521597048:web:7b6e67fd5d10dcf77a8d8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
