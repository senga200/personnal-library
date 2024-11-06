import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-zROju21tAGacoXTff6WdflVgwAi4wYw",
  authDomain: "movies-af9a8.firebaseapp.com",
  projectId: "movies-af9a8",
  storageBucket: "movies-af9a8.firebasestorage.app",
  messagingSenderId: "1087468134786",
  appId: "1:1087468134786:web:73b6deadf1cc08a990ef9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
