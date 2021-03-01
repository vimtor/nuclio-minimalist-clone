import React, {useEffect, useState} from 'react';
import useLists from "../../../hooks/use-lists";
import api from '../../../helpers/api';
import './share-list.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons'

  const ShareList = ({closeModal}) => {
    const {activeId} = useLists()
    const [emails, setEmails] = useState();
    const [owners, setOwners] = useState([]);

    useEffect(() => {
      const getOwners = api.getOwners(activeId);
            getOwners.then( result => {
              setOwners(result.map( email => convertArrayToObject(email)));
        })
    },[activeId]);

     const convertArrayToObject = (value) => {
        return {
          label: value,
          value: value,
        }
    };

    const shareEmail = (userEmails) => {
      const objectArray = Object.entries(userEmails);
      let usersShare = [];

      objectArray.forEach(([key, value]) => {
        usersShare.push(value.label);
      });
      api.shareList(activeId, {userEmails: usersShare});
      setOwners(userEmails);
      closeModal();
    }

    console.log(owners);
    if(!owners?.length) return <h3>There aren't other users!</h3>;

    return (
       <div>
          {/*Lista de los owners */}
          <div>
            <FontAwesomeIcon icon={faUserCircle} />
            {owners.map(owner => <span>{owner.value}</span>)}
          </div>    
         <div>
           <FontAwesomeIcon icon={faUserPlus} />
           <input placeholder="Enter email address"></input>
         </div>
         <button onClick={shareEmail}>done</button>
      </div>
    );

  }
  export default ShareList;
