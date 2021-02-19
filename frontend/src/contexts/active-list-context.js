import {createContext, useEffect, useState} from 'react'
import api from '../helpers/api'
import useLists from "../hooks/use-lists";

export const ActiveListContext = createContext({
    loading: false,
    title: "",
    tasks: [],
    _id: null,
    updateTitle: () => {
    },
    createTask: () => {
    },
    uncheckTask: () => {
    },
    completeTask: () => {
    }
})

const ActiveListProvider = ({children}) => {
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

    const updateDueDateTask = async (id, dueDate) => {
        console.log(`UpdateDueDateTask at activeListContext ${activeId} - ${id} - ${dueDate}`)
        const newList = await api.updateTask(activeId, id, {dueDate: dueDate})
        setActiveList(newList)
    }

    const createTask = async (title) => {
        const newList = await api.createTask(activeId, title)
        setActiveList(newList)
    }

    const uncheckTask = async (id) => {
        const newList = await api.updateTask(activeId, id, {completed: false})
        setActiveList(newList)
    }

    const completeTask = async (id) => {
        const newList = await api.updateTask(activeId, id, {completed: true})
        setActiveList(newList)
    }

    const removeTask = async (id) => {
        await api.removeTask(activeId, id)
        const newTasks = activeList.tasks.filter(({_id}) => _id !== id)
        setActiveList({
            ...activeList,
            tasks: newTasks
        })
    }

    const removeCompletedTasks = async () => {
        await api.removeManyTasks(activeId, {completed: true})
        const newTasks = activeList.tasks.filter(({completed}) => !completed)
        setActiveList({
            ...activeList,
            tasks: newTasks
        })
    }

    return (
        <ActiveListContext.Provider
            value={{loading, ...activeList, updateTitle, updateDueDateTask, removeTask, refreshList, removeCompletedTasks, createTask, completeTask, uncheckTask}}>
            {children}
        </ActiveListContext.Provider>
    )
}

export default ActiveListProvider

