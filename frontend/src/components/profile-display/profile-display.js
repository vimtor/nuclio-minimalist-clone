import React, { useState, useMemo } from "react";
import profileImage from "../../images/profile-placeholder.jpg";
import useUsers from "../../hooks/use-users";
import useAuth from "../../hooks/use-auth";
import {useHistory} from "react-router-dom";
import styles from "./profile-display.module.css"
import EditButton from "../edit-button/edit-button";
import ProfileDisplayEdit from "./profile-display-edit/profile-display-edit";
import Modal from "react-modal";

Modal.setAppElement('#root')

const ProfileDisplay = () => {
    const history = useHistory()
    const {activeUser, alias, avatar, updateProfile} = useUsers()
    const {logout} = useAuth()
    const [isOpen, setIsOpen] = useState(false);

    const avatar64 = useMemo(() => avatar ? Buffer.from(avatar): [], [avatar]);

    const handleLogout = () => {
        logout()
        history.push("/login")
    }
    const redirectToProfile = () => {
        history.push("/profile")
    }

    const handleOpenEditProfile = () => {
        setIsOpen(true);
    }

    const CurrentImage = () => {
        if (!avatar) return <img className={styles.image} src={Buffer.from(profileImage)} alt="profile image"/>
        return <img className={styles.image} src={avatar64} alt="profile image"/>
    }

    return (
        <section className={styles.container}>
            <CurrentImage />
            <div className={styles.content}>
                <div className={styles.right}>
                    <h3 className={styles.name}>{alias}</h3>
                    <EditButton onClick={() => handleOpenEditProfile()} className={styles.pen}/>
                </div>
                <button className={styles.button} onClick={handleLogout}>Sign out</button>
            </div>
            <ProfileDisplayEdit isOpen={isOpen} setIsOpen={setIsOpen} userId={activeUser} updateProfile={updateProfile}/>
        </section>
    )
}

export default ProfileDisplay
