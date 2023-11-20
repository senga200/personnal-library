import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteBook,
  deleteBookFromFirebase,
  deleteBookFailure,
} from "../redux/actions/AddBookAction";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Delete({ index, id }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setContentModal("");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (!index || !id) {
      dispatch(deleteBookFailure());
      setIsModalOpen(true);
      setContentModal("failure !");
      return;
    }

    dispatch(deleteBook(id));
    dispatch(deleteBookFromFirebase(id));
    setIsModalOpen(true);
    setContentModal("Delete book Successfully");
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
        <Modal
          isOpen={isModalOpen}
          isClose={closeModal}
          content={contentModal}
        />
      </div>
    </div>
  );
}

export default Delete;
