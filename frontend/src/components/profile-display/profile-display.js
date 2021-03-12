import React, { useState, useEffect } from "react";
import useUsers from "../../hooks/use-users";
import useAuth from "../../hooks/use-auth";
import { useHistory } from "react-router-dom";
import styles from "./profile-display.module.css";
import EditButton from "../edit-button/edit-button";
import ProfileDisplayEdit from "./profile-display-edit/profile-display-edit";
import Modal from "react-modal";
import ProfileImage from "../profile-image/profile-image";
import api from "../../helpers/api";

Modal.setAppElement("#root");

const ProfileDisplay = () => {
  const history = useHistory();
  const { activeUser, alias, avatar, updateProfile } = useUsers();
  const { logout, userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userInfo = api.getUser(userId);
    userInfo.then((result) => {
      setEmail(result.email.split("@"));
    });
  }, [userId]);

  const handleLogout = () => {
    logout();
    history.push("/login");
  };
  const handleOpenEditProfile = () => {
    setIsOpen(true);
  };

  const redirectToProfile = () => {
    history.push("/profile");
  };

  return (
    <section className={styles.container}>
      <ProfileImage avatar={avatar} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.right}>
          <h3 className={styles.name} onClick={redirectToProfile}>
            {alias ? alias : email[0]}
          </h3>
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
