import styles from './lists-feed.module.css'
import ListItem from "./list-item/list-item";

const ListsFeed = () => {
    return (
        <section>
            <h3 className={styles.title}>Your lists</h3>
            <ul>
                <ListItem title="Untitled list" />
                <ListItem title="Untitled list" tasksLeft={4} active />
            </ul>
            <button className={styles.button}>+ Add new list</button>
        </section>
    )
}

export default ListsFeed
