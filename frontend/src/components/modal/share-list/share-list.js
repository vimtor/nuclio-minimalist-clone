import React, { useEffect, useState, useRef } from "react";
import useLists from "../../../hooks/use-lists";
import api from "../../../helpers/api";
import styles from "./share-list.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ProfileImage from "../../profile-image/profile-image";

const ShareList = ({ closeModal }) => {
  const { activeId } = useLists();

  const [owners, setOwners] = useState([]);
  const newOwners = useRef();

  useEffect(() => {
    const getOwners = api.getOwners(activeId);
    getOwners.then((result) => {
      setOwners(result);
    });
  }, [activeId]);

  const shareEmail = () => {
    let usersShare = [];

    if (newOwners != null) {
      const shareOwners = newOwners.current.value.split(",");
      const objectArray = Object.entries(owners);

      objectArray.forEach(([key, value]) => {
        usersShare.push(value.email);
      });
      const totalOwners = shareOwners.concat(usersShare);
      api.shareList(activeId, { userEmails: totalOwners });
      closeModal();
    } else {
      closeModal();
    }
  };

  return (
    <div className={styles.container}>
      <div>
        {owners?.map((owner) => (
          <div key={owner.id} className={styles.owners}>
            <ProfileImage avatar={owner.avatar} className={styles.avatar} />
            <span className={styles.emailOwner}>{owner.email}</span>
          </div>
        ))}
      </div>
      <div className={styles.shareList}>
        <FontAwesomeIcon icon={faUserPlus} className={styles.shareIcon} />
        <input
          placeholder="Enter email address"
          ref={newOwners}
          className={styles.shareInput}
        ></input>
      </div>
      <button className={styles.doneButton} onClick={shareEmail}>
        Done
      </button>
    </div>
  );
};
export default ShareList;
