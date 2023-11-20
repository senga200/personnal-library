import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const GetBooks = async () => {
  const booksCollection = collection(db, "books");
  try {
    const booksData = await getDocs(booksCollection);
    return booksData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetch Firebase:", error);
    return [];
  }
};
