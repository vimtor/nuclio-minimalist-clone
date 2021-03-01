import {useContext} from "react";
import {TasksContext} from "../contexts/tasks-context";

const useTasks = () => {
    const context = useContext(TasksContext)
    if (!context) {
        throw Error('The hook useLists must be used within ListsProvider')
    }
    return context
}

export default useTasks
