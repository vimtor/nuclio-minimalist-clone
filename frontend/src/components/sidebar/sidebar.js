import ProfileDisplay from "../profile-display/profile-display";
import ListsFeed from "../lists-feed/lists-feed";
import styles from './sidebar.module.css'

const Sidebar = () => {
  return (
      <aside className={styles.container}>
          <ProfileDisplay />
          <ListsFeed />
      </aside>
  )
}

export default Sidebar
