import {createContext, useEffect, useState} from 'react'
import api from '../helpers/api'
import useTasks from "../hooks/use-tasks";

export const TasksContext = createContext({
    loading: false,
    title: "",
    chartTasks: [],
    _id: null,
})

const TasksProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [chartTasks, setChartTasks] = useState(null)

    useEffect(() => {
        api.getChartTasks().then((res) => {
            setLoading(false)
            setChartTasks(res)
        });
    }, [])

    return (
        <TasksContext.Provider
            value={{loading, chartTasks}}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider

