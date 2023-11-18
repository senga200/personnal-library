import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQSmuZYuTGpKWy_6ve2MGFnD53ulRzGwE",
  authDomain: "books-app-a55d3.firebaseapp.com",
  projectId: "books-app-a55d3",
  storageBucket: "books-app-a55d3.appspot.com",
  messagingSenderId: "475337124055",
  appId: "1:475337124055:web:03bbaa5348287d60e82892",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
