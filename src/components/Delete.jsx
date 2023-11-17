import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook, deleteBookFailure } from "../redux/actions/AddBookAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
        <span
          onClick={handleDelete}
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </span>
      </div>
    </div>
  );
}

export default Delete;
