import styles from "./task-list.module.css";
import CloseButton from "../../close-button/close-button";
import useActiveList from "../../../hooks/use-active-list";

const TaskList = () => {
    const {removeTask, tasks, uncheckTask, completeTask} = useActiveList()

    return (
        <ul className={styles.list}>
            {tasks?.map(({_id, title, completed}) => {
                return (
                    <li className={styles.item} key={_id}>
                        <input type="checkbox" checked={completed} onChange={() => {
                            if (completed) {
                                uncheckTask(_id)
                            } else {
                                completeTask(_id)
                            }
                        }}/>
                        {title}
                        <CloseButton onClick={() => removeTask(_id)} className={styles.cross}/>
                    </li>
                )
            })}
        </ul>
    )
}

export default TaskList
