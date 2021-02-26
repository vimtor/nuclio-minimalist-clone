import React, {useEffect, useState} from 'react';
import useLists from "../../../hooks/use-lists";
import api from '../../../helpers/api';
import './share-list.css'
import MultiSelect from "react-multi-select-component";

  const ShareList = () => {
    const {activeId} = useLists()
    const [emails, setEmails] = useState();
    const [selected, setSelected] = useState([]);

    useEffect(() => {
      const getOwners = api.getOwners(activeId);
            getOwners.then( result => {
            setSelected(result.map( email => convertArrayToObject(email)));
        })
      const getEmails = api.getEmails();
            getEmails.then( result => {
            setEmails(result.data.map( email => convertArrayToObject(email)));
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
      setSelected(userEmails);
    }

    if(!emails?.length) return <h3>There aren't other users!</h3>;

    return (
       <div>
         <MultiSelect
          options={emails}
          value={selected}
          onChange={selected ? user => shareEmail(user) : []}
          labelledBy={"Select"}
        />
      </div>
    );

  }
  export default ShareList;
