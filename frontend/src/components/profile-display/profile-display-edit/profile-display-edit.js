import React, {useRef, useState, useEffect} from "react";
import styles from "./profile-display-edit.module.css"
import Modal from 'react-modal';
import ProfileAvatar from "../profile-avatar/profile-avatar";
import useUsers from "../../../hooks/use-users";


const ProfileDisplayEdit = ({isOpen, setIsOpen, userId, updateProfile}) => {
    const aliasRef = useRef();
    const {alias, avatar} = useUsers()

    const [preview, setPreview] = useState(null);       //Collect data

    const handleUpdate = () => {
        updateProfile(userId, aliasRef.current.value, preview);
        setIsOpen(false);
    }
    const handleCancel = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if(avatar) setPreview(Buffer.from(avatar));
    }, [avatar])

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Update profile"
            className={styles.modal}
            shouldCloseOnEsc={true}
        >
            <div className={styles.container}>
                <div className={styles.title}>
                    <h2>Update profile</h2>
                </div>
                <div className={styles.modalContent}>
                    <div className={styles.formHolder}>
                        <form>
                            <div className={styles.aliasHolder}>
                                <input type="text" defaultValue={alias} placeHolder="Give me your alias" ref={aliasRef} className={styles.alias}/>
                            </div>
                            <div className={styles.avatarHolder}>
                                <ProfileAvatar preview={preview} setPreview={setPreview}/>
                            </div>
                        </form>
                    </div>
                    <div className={styles.buttonHolder}>
                        <button onClick={handleUpdate} className={styles.button}>Apply</button>
                        <button onClick={handleCancel} className={styles.button}>Cancel</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ProfileDisplayEdit

