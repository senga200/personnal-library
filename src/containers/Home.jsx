import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import SearchBook from "../components/SearchBook";
import Delete from "../components/Delete";
import Collapse from "../components/Collapse";
import "../style/Style.css";

function Home() {
  const [booksFirebase, setBooksFirebase] = useState([]);
  const booksCollection = collection(db, "books");

  useEffect(() => {
    const getBooksFirebase = async () => {
      const booksData = await getDocs(booksCollection);
      console.log("booksData", booksData);

      setBooksFirebase(
        booksData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getBooksFirebase();
  }, [booksCollection]);

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
          <Collapse title="Books Table">
            <div className="add-book_table">
              <div className="books-table">
                <h2>Books from Firebase</h2>
                {booksFirebase.length > 0 ? (
                  <table className="books-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {booksFirebase.map((book, index) => (
                        <tr key={index}>
                          <td className="books-table_content">{book.title}</td>
                          <td className="books-table_content">{book.author}</td>
                          <td className="books-table_delete">
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
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Home;
