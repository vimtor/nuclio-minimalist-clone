import {createContext, useEffect, useState} from 'react'
import api from '../helpers/api'

export const ListsContext = createContext({
    loading: false,
    lists: [],
    activeId: null,
    setActiveList: () => {

    },
    removeList: () => {
    },
    createList: () => {
    },
    updateListTitle: () => {
    },
    // TODO: Implement sharing
    shareList: () => {
    }
})

const ListsProvider = ({children}) => {
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeId, setActiveList] = useState(null)

    useEffect(() => {
        api.fetchLists().then((data) => {
            setLoading(true)
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

    const updateListTitle = async (title) => {
        await api.updateList({title})
        setLists(lists.map(list => {
            if (list.title === title) {
                return {
                    ...list,
                    title,
                }
            }
            return list
        }))
    }

    return (
        <ListsContext.Provider value={{loading, lists, activeId, setActiveList, createList, removeList, updateListTitle}}>
            {children}
        </ListsContext.Provider>
    )
}

export default ListsProvider

