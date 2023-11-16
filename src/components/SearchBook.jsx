import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchBooks,
  searchBooksLoading,
  searchBooksFailure,
} from "../redux/actions/SearchBookAction";

function SearchBook() {
  const APIKey = "AIzaSyCED0o_huLcg8pn0KopN_wRdQO3d7oGHtU";
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((state) => state.searchBooks);
  const fetchedBooks = store.fetchedBooks;

  useEffect(() => {
    console.log("Updated store:", store);
    console.table("store.fetchedBooks table", store.fetchedBooks);
  }, [store]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the loading action
    dispatch(searchBooksLoading());

    // Fetch from Google Books API and dispatch success or failure actions
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APIKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(searchBooks(data.items || []));
        console.log("data", data);
        console.log("data.items", data.items);
        console.log("store", store);
        console.log("store.fetchedBooks", store.fetchedBooks);
        console.log("fetched books", data.items || []);
      })
      .catch((error) => {
        dispatch(searchBooksFailure(error.message));
      });
  };

  console.log("store après dispatch", store);
  console.log("store.fetchedBooks après dispatch", store.fetchedBooks);

  return (
    <div className="search-form_container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a book"
          required
        />
        <button>Search</button>
      </form>
      <div className="search-form_results">
        {store.loading && <div className="loading">Loading...</div>}
        {store.error && <div className="error">{store.error}</div>}
        <table className="books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Publish Date</th>
              <th>Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {fetchedBooks.map((book, index) => (
              <tr key={index}>
                <td>{book.volumeInfo.title}</td>
                <td>{book.volumeInfo.authors}</td>
                <td>{book.volumeInfo.publisher}</td>
                <td>{book.volumeInfo.publishedDate}</td>
                <td>
                  <img
                    src={
                      book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.thumbnail
                        : "https://via.placeholder.com/150"
                    }
                    alt={`${book.volumeInfo.title} book`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchBook;
