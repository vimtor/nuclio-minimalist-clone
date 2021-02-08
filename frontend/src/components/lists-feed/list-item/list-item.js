import styles from './list-item.module.css'

const CloseButton = ({onClick}) => {
    return (
        <svg onClick={onClick} className={styles.cross} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24">
            <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"/>
        </svg>
    )
}


const ListItem = ({title, active, tasksLeft, onClick, onRemove}) => {
    return (
        <li onClick={onClick} className={`${styles.container} ${active && styles.active}`}>
            {title} {tasksLeft && <span className={styles.tasksLeft}>({tasksLeft})</span>}
            <CloseButton onClick={onRemove} />
        </li>
    )
}

export default ListItem
