import React, { useRef, useState } from "react";
import styles from "./profile-display-edit.module.css"
import Modal from 'react-modal';
import ProfileAvatar from "../profile-avatar/profile-avatar";
import useUsers from "../../../hooks/use-users";


const ProfileDisplayEdit = ({isOpen, setIsOpen, userId, updateProfile}) => {
    const aliasRef = useRef();
    const {alias, avatar} = useUsers();
    const [preview, setPreview] = useState(avatar || null);       //Collect data

    const handleUpdate = () => {
        updateProfile(userId, aliasRef.current.value, preview);
        setIsOpen(false);
    }
    const handleCancel = () => {
        setIsOpen(false);
    }

    let subtitle = "Subtitle placeholder";

    return (
        <div>
            <Modal
                isOpen={isOpen}
                // style={customStyles}
                contentLabel="Update profile"
                className={styles.modal}
                overlayClassName={styles.overlay}
                portalClassName={styles.portal}
                shouldCloseOnEsc={true}
            >
                <h2>Update profile</h2>
                <form>
                    <input type="text" defaultValue={alias} placeHolder="Give me your alias" ref={aliasRef}/>
                    <ProfileAvatar preview={preview} setPreview={setPreview}/>
                </form>
                <button onClick={handleUpdate} className={styles.button}>Apply</button>
                <button onClick={handleCancel} className={styles.button}>Cancel</button>
            </Modal>
        </div>
    )
}

export default ProfileDisplayEdit

