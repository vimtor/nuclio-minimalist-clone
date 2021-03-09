import React, { useState, useEffect } from "react";
import useUsers from "../../hooks/use-users";
import useAuth from "../../hooks/use-auth";
import styles from "./profile-info.module.css";
import ProfileImage from "../profile-image/profile-image";
import api from "../../helpers/api";

const ProfileInfo = () => {
  const { alias, avatar } = useUsers();
  const [email, setEmail] = useState("");
  const { userId } = useAuth();

  console.log(avatar);

  useEffect(() => {
    const userInfo = api.getUser(userId);
    userInfo.then((result) => {
      setEmail(result.email.split("@"));
      console.log(avatar);
    });
  }, [userId]);

  return (
    <section>
      <ProfileImage avatar={avatar} className={styles.image} />

      <ul className={styles.info}>
        <li>{alias ? alias : email[0]}</li>
        <li>
          {email[0]}@{email[1]}
        </li>
      </ul>
    </section>
  );
};

export default ProfileInfo;
