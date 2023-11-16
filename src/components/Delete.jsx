import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook, deleteBookFailure } from "../redux/actions/AddBookAction";

function Delete({ index, id }) {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("index", index);
    if (!index || !id) {
      alert("failure !");
      dispatch(deleteBookFailure());
      return;
    }
    dispatch(deleteBook(id));
    alert("Book Deleted Successfully");
  };

  return (
    <div>
      <div className="add-fom">
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
}

export default Delete;
