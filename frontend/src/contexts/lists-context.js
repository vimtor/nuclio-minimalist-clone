import React from "react";
import { createContext, useEffect, useState } from "react";
import api from "../helpers/api";

export const ListsContext = createContext({
  loading: false,
  lists: [],
  activeId: null,
  setActiveList: () => {},
  removeList: () => {},
  createList: () => {},
  updateList: () => {},
});

const ListsProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveList] = useState(null);

  useEffect(() => {
    api.fetchLists().then((data) => {
      setLoading(false);
      if (data) {
        setLists(data);
        setActiveList(data[0]._id);
      }
    });
  }, []);

  const createList = async () => {
    const list = await api.createList();
    setLists([...lists, list]);
  };

  const removeList = async (id) => {
    await api.removeList(id);
    const newLists = lists.filter(({ _id }) => _id !== id);

    setLists(newLists);
    if (newLists.length > 0) {
      setActiveList(newLists[0]._id);
    } else {
      setActiveList(null);
    }
  };

  const updateList = async (id, body) => {
    await api.updateList(id, body);
    setLists(
      lists.map((list) => {
        if (list._id === id) {
          return {
            ...list,
            ...body,
          };
        }
        return list;
      })
    );
  };

  return (
    <ListsContext.Provider
      value={{
        loading,
        lists,
        activeId,
        setLists,
        setActiveList,
        createList,
        removeList,
        updateList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export default ListsProvider;
