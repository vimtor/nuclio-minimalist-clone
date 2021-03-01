import React from "react";
import {createContext, useEffect, useState} from 'react'
import api from '../helpers/api'

export const ListsContext = createContext({
    loading: false,
    lists: [],
    activeId: null,
    setActiveList: () => {},
    removeList: () => {},
    createList: () => {},
    updateList: () => {},
})

const ListsProvider = ({children}) => {
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeId, setActiveList] = useState(null)

    useEffect(() => {
        api.fetchLists().then((data) => {
            setLoading(false)
            setLists(data)
            setActiveList(data[0]._id)
        })
    }, [])

    const createList = async () => {
        const list = await api.createList()
        setLists([...lists, list])
    }

    const removeList = async (id) => {
        await api.removeList(id)
        const newLists = lists.filter(({_id}) => _id !== id);
        setLists(newLists)
        setActiveList(newLists[0]._id)
    }

    const updateList = async (id, body) => {
        await api.updateList(id, body)
        setLists(lists.map(list => {
            if (list._id === id) {
                return {
                    ...list,
                    ...body,
                }
            }
            return list
        }))
    }

    return (
        <ListsContext.Provider value={{loading, lists, activeId, setActiveList, createList, removeList, updateList}}>
            {children}
        </ListsContext.Provider>
    )
}

export default ListsProvider

