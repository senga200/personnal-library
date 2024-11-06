import React from "react";
import { useState, useEffect } from "react";
import SearchBook from "../components/SearchBook";
import BookManager from "../firebase/BookManager";
import Delete from "../components/Delete";
import Collapse from "../components/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import "../style/Style.css";

function Home() {
  const [booksFirebase, setBooksFirebase] = useState([]);
  const [sort, setSort] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sort === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSort(column);
      setSortOrder("asc");
    }
  };

  const sortedBooks = [...booksFirebase].sort((a, b) => {
    if (sort === "title" || sort === "author") {
      const comparison = a[sort].localeCompare(b[sort]);
      return sortOrder === "asc" ? comparison : -comparison;
    }
    return 0;
  });

  useEffect(() => {}, [booksFirebase]);

  return (
    <div className="main">
      <div className="main_header">
        <h1>ADD-A-MOVIE !!</h1>
      </div>
      <div className="library">
        <BookManager onDataChange={setBooksFirebase} />
        <div className="search-book">
          <Collapse title="Search a movie">
            <SearchBook />
          </Collapse>
        </div>
        <div className="add-book">
          <Collapse title="My movie Table">
            <div className="add-book_table">
              <div className="books-table">
                {sortedBooks.length > 0 ? (
                  <table className="books-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort("title")}>
                          Title <FontAwesomeIcon icon={faSort} />
                        </th>
                        <th onClick={() => handleSort("author")}>
                          Author <FontAwesomeIcon icon={faSort} />
                        </th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedBooks.map((book, index) => (
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
                  <p>No movie here...</p>
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
