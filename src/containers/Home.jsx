import React from "react";
import { useSelector } from "react-redux";
import AddForm from "../components/AddForm";

function Home() {
  //search for the books state in the store
  const books = useSelector((state) => state.addBook.books);

  return (
    <div className="main">
      <h1>Personal Library</h1>
      <p>
        Add a book to your library by clicking on the "Add Book" link above.
      </p>
      <AddForm />
      <div>
        <h2>books table </h2>
        <ul className="books-list_table">
          {books.map((book, index) => (
            <li key={index} className="books-list_items">
              <span>{book.title}</span>
              <span>{book.author}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
