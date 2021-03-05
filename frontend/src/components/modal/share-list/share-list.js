import React, { useEffect, useState, useRef } from "react";
import useLists from "../../../hooks/use-lists";
import api from "../../../helpers/api";
import "./share-list.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/use-auth";

const ShareList = ({ closeModal }) => {
  const { activeId } = useLists();
  const { userId } = useAuth();

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
      console.log(totalOwners);

      api.shareList(activeId, { userEmails: totalOwners });
      closeModal();
    } else {
      closeModal();
    }
  };

  return (
    <div className="container">
      {/*Lista de los owners */}
      <div>
        {owners?.map((owner) => (
          <div key={owner.id} className="owners">
            <img src={owner.avatar} alt={owner.avatar} />
            <span className="emailOwner">
              {owner.id === userId ? owner.email + " (Owner)" : owner.email}
            </span>
            <button className="deleteOwner">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ))}
      </div>
      <div className="shareList">
        <FontAwesomeIcon icon={faUserPlus} className="shareIcon" />
        <input
          placeholder="Enter email address"
          ref={newOwners}
          className="shareInput"
        ></input>
      </div>
      <button className="doneButton" onClick={shareEmail}>
        Done
      </button>
    </div>
  );
};
export default ShareList;
