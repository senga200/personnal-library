//import "./ComponentsStyle.css";
import React from "react";
import ReactDOM from "react-dom";
import "../style/Modal.css";

const ModalOverlay = ({ isOpen, isClose, content }) => {
  const handleModalClick = (e) => {
    // ingore background click
    if (e.target.classList.contains("modalBack")) {
      return;
    }
  };

  return (
    <div>
      {isOpen ? (
        <div className="modalBack" onClick={handleModalClick}>
          <div className="ModalView">
            {content}
            <div className="close-btn" onClick={isClose}>
              ✖️
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const Modal = ({ isOpen, isClose, content }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay isOpen={isOpen} isClose={isClose} content={content} />,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default Modal;
