import styles from "./card-footer.module.css";
import useActiveList from "../../../hooks/use-active-list";

const CardFooter = () => {
    const {removeCompletedTasks} = useActiveList()

    return (
        <footer className={styles.footer}>
            <button onClick={removeCompletedTasks}>Clear all completed</button>
        </footer>
    )
}

export default CardFooter
