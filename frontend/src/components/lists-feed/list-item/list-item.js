import React from "react";
import styles from './list-item.module.css'
import CloseButton from "../../close-button/close-button";


const ListItem = ({title, active, tasksLeft, onClick, onRemove}) => {
    return (
        <li onClick={onClick} className={`${styles.container} ${active && styles.active}`}>
            {title} {tasksLeft && <span className={styles.tasksLeft}>({tasksLeft})</span>}
            <CloseButton className={styles.cross} onClick={onRemove} />
        </li>
    )
}

export default ListItem
