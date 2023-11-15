import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, addBookFailure } from "../redux/actions/AddBookAction";

function AddForm() {
  const dispatch = useDispatch();
  const newBook = useSelector((state) => state.addBook);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    console.log("Updated store:", newBook);
  }, [newBook]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "" || author === "") {
      alert("failure !");
      dispatch(addBookFailure());
      return;
    }
    dispatch(
      addBook({
        id: newBook.books.length + 1,
        title,
        author,
      })
    );
    setAuthor("");
    setTitle("");
    alert("Book Added Successfully");
  };

  return (
    <div className="add-form_container">
      <div className="add-fom">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="add-form_input"
          placeholder="Book Title"
          required
        />
      </div>
      <div className="add-fom">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="add-form_input"
          placeholder="Author Name"
          required
        />
      </div>
      <div className="add-fom">
        <button onClick={handleSubmit}>Add Book</button>
      </div>
    </div>
  );
}

export default AddForm;
