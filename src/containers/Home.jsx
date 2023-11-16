import React from "react";
import { useSelector } from "react-redux";
import AddForm from "../components/AddForm";
import SearchBook from "../components/SearchBook";
import Delete from "../components/Delete";
import Collapse from "../components/Collapse";
import "../style/Style.css";

function Home() {
  const books = useSelector((state) => state.addBook.books);

  return (
    <div className="main">
      <div className="main_header">
        <h1>MY OWN PERSONAL LIBRARY !!</h1>
      </div>
      <div className="library">
        <div className="search-book">
          <Collapse title="Search a book">
            <SearchBook />
          </Collapse>
        </div>
        <div className="add-book">
          <Collapse title="Add a book">
            <AddForm />
            <p>
              Add a book to your library by clicking on the "Add Book" link
              above.
            </p>
            <div className="add-book_table">
              <h2>Books Table</h2>
              {books.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book, index) => (
                      <tr key={index}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                          <Delete id={book.id} index={index} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No books here...</p>
              )}
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Home;
