import React from "react";
import styles from "./profile-image.module.css";
import profileImage from "../../images/profile-placeholder.jpg";

const ProfileImage = ({ avatar, className }) => {
  return (
    <img
      className={`${styles.image} ${className}`}
      src={Buffer.from(avatar || profileImage)}
      alt="profile image"
    />
  );
};

export default ProfileImage;
