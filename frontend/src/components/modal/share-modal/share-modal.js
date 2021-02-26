import React, {useState} from 'react';
import ShareList from '../share-users';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const ShareModal = ({modalIsOpen, toggleModal}) => {
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
    };

    function closeModal(){
        toggleModal(false);
    }

    return (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <ShareList />
            <button onClick={closeModal}>close</button>
        </Modal>
    )
}
export default ShareModal;
