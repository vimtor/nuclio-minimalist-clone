import React, {useState} from 'react';
import ShareList from '../share-users';
import Modal from 'react-modal';
import styles from './share-modal.module.css';

Modal.setAppElement('#root')

const ShareModal = ({modalIsOpen, toggleModal}) => {
    function closeModal(){
        toggleModal(false);
    }

    return (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={styles.modal}
        >
            <ShareList />
            <button onClick={closeModal}>close</button>
        </Modal>
    )
}
export default ShareModal;
