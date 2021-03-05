import React, { useState } from "react";
import ShareList from "../share-list/share-list";
import Modal from "react-modal";
import styles from "./share-modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const ShareModal = ({ modalIsOpen, toggleModal }) => {
  function closeModal() {
    toggleModal(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={styles.modal}
      overlayClassName={styles.Overlay}
    >
      <div className={styles.buttonContainer}>
        <span className={styles.message}>Share this list</span>
      </div>
      <div className={styles.shareContainer}>
        <ShareList closeModal={closeModal} />
      </div>
    </Modal>
  );
};
export default ShareModal;
