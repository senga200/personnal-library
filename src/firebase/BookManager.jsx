import { useEffect } from "react";
import { GetBooks } from "../firebase/GetBooks";

const BookManager = ({ onDataChange }) => {
  useEffect(() => {
    const fetchData = async () => {
      const books = await GetBooks();
      onDataChange(books);
    };

    fetchData();
  }, [onDataChange]);

  return null;
};

export default BookManager;
