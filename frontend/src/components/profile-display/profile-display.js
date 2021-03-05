import React, { useState } from "react";
import useUsers from "../../hooks/use-users";
import useAuth from "../../hooks/use-auth";
import { useHistory } from "react-router-dom";
import styles from "./profile-display.module.css";
import EditButton from "../edit-button/edit-button";
import ProfileDisplayEdit from "./profile-display-edit/profile-display-edit";
import Modal from "react-modal";
import ProfileImage from "../profile-image/profile-image";

Modal.setAppElement("#root");

const ProfileDisplay = () => {
  const history = useHistory();
  const { activeUser, alias, avatar, updateProfile } = useUsers();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  const handleOpenEditProfile = () => {
    setIsOpen(true);
  };

  return (
    <section className={styles.container}>
      <ProfileImage avatar={avatar} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.right}>
          <h3 className={styles.name}>{alias}</h3>
          <EditButton onClick={handleOpenEditProfile} className={styles.pen} />
        </div>
        <button className={styles.button} onClick={handleLogout}>
          Sign out
        </button>
      </div>
      <ProfileDisplayEdit
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userId={activeUser}
        updateProfile={updateProfile}
      />
    </section>
  );
};

export default ProfileDisplay;
