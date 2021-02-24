import React, {useEffect, useState} from 'react';
import useLists from "../../hooks/use-lists";
import api from '../../helpers/api';
import './share-users.css'
import MultiSelect from "react-multi-select-component";


   
  const ShareList = () => {
    const {activeId} = useLists()
    const options = []

    const convertArrayToObject = (value) => {
      console.log(value);
      return {
        label: value,
        value: value,
      }      
    };

    const getEmails = api.getUserEmails(activeId).then(result => (result.map(value => options.push(convertArrayToObject(value.email)))));
    
     
    console.log(options);
       
    
    const [emails, setEmails] = useState([]);

 
    //console.log(emails);

    const [selected, setSelected] = useState();
     
    if(!emails) return <h3>There are no other users!</h3>;

    return (

    
       <div>
          <h1>Select Users</h1>
          <pre>{JSON.stringify(selected)}</pre>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy={"Select"}
          />
      </div>
   
          
    );
     
  }
  export default ShareList;