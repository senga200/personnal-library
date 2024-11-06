import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcICcsSlMQYLO_KuQnxbF8D5xsrMmes3g",
  authDomain: "addabook-bc27b.firebaseapp.com",
  projectId: "addabook-bc27b",
  storageBucket: "addabook-bc27b.appspot.com",
  messagingSenderId: "268282617945",
  appId: "1:268282617945:web:a120e77244ecd70d821148",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
