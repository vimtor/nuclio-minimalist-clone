import styles from "./task-list.module.css";
import CloseButton from "../../close-button/close-button";
import useActiveList from "../../../hooks/use-active-list";
import DateButton from "../../date-button/date-button";

const TaskList = () => {
    const {removeTask, tasks, uncheckTask, updateDueDateTask, completeTask} = useActiveList()

    return (
        <ul>
            {tasks?.map(({_id, title, completed, dueDate}) => {
                return (
                    <li key={_id} className={styles.list}>
                        <div className={styles.left}>
                            <input type="checkbox" checked={completed} onChange={() => {
                                if (completed) {
                                    uncheckTask(_id)
                                } else {
                                    completeTask(_id)
                                }
                            }}/>
                            {title}
                        </div>
                        <div className={styles.right}>
                            <DateButton date={dueDate} updateDueDate={(date) => updateDueDateTask(_id, date)}/>
                        </div>
                        <CloseButton onClick={() => removeTask(_id)} className={styles.cross}/>
                    </li>
                )
            })}
                </ul>
                )
            }

            export default TaskList
