import ReactModal from "react-modal";

import css from "./ModalContainer.module.css";

ReactModal.setAppElement(document.getElementById("root"));

function ModalContainer({ isOpen, onClose, className = "", children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => onClose(false)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      preventScroll={true}
      className={`${css.modal} ${className}`}
      overlayClassName={`${css.overlay} ${isOpen ? css.overlayIsOpen : ""}`}
    >
      {children}
    </ReactModal>
  );
}

export default ModalContainer;
