import {useState, useEffect} from 'react'
import useLists from "./use-lists";
import api from "../helpers/api";

const useActiveList = () => {
    const {loading, updateList, activeId} = useLists()
    const [activeList, setActiveList] = useState(null)

    const refreshList = async () => {
        api.fetchOneList(activeId).then(setActiveList)
    }

    useEffect(() => {
        if (activeId) {
            refreshList()
        }
    }, [activeId])

    const updateTitle = (title) => {
        updateList(activeId, {title})
    }

    const createTask = async (title) => {
        const newList = await api.createTask(activeId, title)
        setActiveList(newList)
    }

    return {
        loading,
        ...activeList,
        updateTitle,
        createTask,
    }
}

export default useActiveList
