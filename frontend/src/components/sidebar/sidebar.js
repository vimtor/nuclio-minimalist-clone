import React from "react";
import ProfileDisplay from "../profile-display/profile-display";
import ListsFeed from "../lists-feed/lists-feed";
import styles from "./sidebar.module.css";
import UserProvider from "../../contexts/users-context";

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <UserProvider>
        <ProfileDisplay />
      </UserProvider>
      <ListsFeed />
    </aside>
  );
};

export default Sidebar;
