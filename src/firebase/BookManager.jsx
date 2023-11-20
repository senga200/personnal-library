import { db } from "../firebase/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const BookManager = ({ onDataChange }) => {
  useEffect(() => {
    const booksCollection = collection(db, "books");

    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      onDataChange(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, [onDataChange]);

  return null;
};

export default BookManager;
