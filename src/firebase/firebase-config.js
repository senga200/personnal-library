import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmwdOKQaSGNnsbHZSGLKI9pfy7Kb4fILQ",
  authDomain: "add-a-book-d1329.firebaseapp.com",
  projectId: "add-a-book-d1329",
  storageBucket: "add-a-book-d1329.appspot.com",
  messagingSenderId: "425210969292",
  appId: "1:425210969292:web:1f4747d66645246fad9669",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
