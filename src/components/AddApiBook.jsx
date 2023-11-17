import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addBookFromAPI,
  addBookToFirebase,
  addBookFailure,
} from "../redux/actions/AddBookAction";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function AddApiBook({ book }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setContentModal("");
  };

  const handleAddApiBook = () => {
    if (!book) {
      dispatch(addBookFailure());
      setIsModalOpen(true);
      setContentModal("failure !");
      return;
    }
    dispatch(addBookFromAPI(book));
    dispatch(addBookToFirebase(book));
    console.log("book après dispatch", book);

    setIsModalOpen(true);
    setContentModal("Book Added Successfully");
  };

  return (
    <div>
      <span
        onClick={handleAddApiBook}
        style={{ cursor: "pointer", fontSize: "1.5rem" }}
      >
        <FontAwesomeIcon icon={faCirclePlus} />
      </span>
      <Modal isOpen={isModalOpen} isClose={closeModal} content={contentModal} />
    </div>
  );
}

export default AddApiBook;
