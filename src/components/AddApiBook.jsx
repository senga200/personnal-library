import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const existingBooks = useSelector((state) => state.addBook.books);

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

    const existingBook = existingBooks.find(
      (existingBook) => existingBook.id === book.id
    );
    if (existingBook) {
      setIsModalOpen(true);
      setContentModal("You already have this book in your library !");
      return;
    }

    dispatch(addBookFromAPI(book));
    dispatch(addBookToFirebase(book));

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
