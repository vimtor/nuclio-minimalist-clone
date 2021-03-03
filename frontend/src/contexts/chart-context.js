import {createContext, useEffect, useState} from 'react'
import api from '../helpers/api'
import useChart from "../hooks/use-chart";

export const ChartContext = createContext({
    loading: false,
    title: "",
    chartTasks: [],
    _id: null,
})

const ChartProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [chartTasks, setChartTasks] = useState(null)

    useEffect(() => {
        api.getChartTasks().then((res) => {
            setLoading(false)
            setChartTasks(res)
        });
    }, [])

    return (
        <ChartContext.Provider
            value={{loading, chartTasks}}>
            {children}
        </ChartContext.Provider>
    )
}

export default ChartProvider

