import styles from './lists-feed.module.css'
import ListItem from "./list-item/list-item";
import useLists from "../../hooks/use-lists";

const ListsFeed = () => {
    const {lists, activeId, setActiveList, removeList, createList} = useLists()

    return (
        <section>
            <h3 className={styles.title}>Your lists</h3>
            <ul>
                {lists.map(({_id, title}) => (
                    <ListItem
                        key={_id}
                        title={title}
                        active={_id === activeId}
                        onClick={() => setActiveList(_id)}
                        onRemove={() => removeList(_id)}
                    />
                ))}
            </ul>
            <button className={styles.button} onClick={createList}>
                + Add new list
            </button>
        </section>
    )
}

export default ListsFeed
