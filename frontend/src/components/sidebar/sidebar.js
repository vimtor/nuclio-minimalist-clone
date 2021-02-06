import ProfileDisplay from "../profile-display/profile-display";
import ListsFeed from "../lists-feed/lists-feed";
import './sidebar.css'

const Sidebar = () => {
  return (
      <aside className="sidebar-container">
          <ProfileDisplay />
          <ListsFeed />
      </aside>
  )
}

export default Sidebar
