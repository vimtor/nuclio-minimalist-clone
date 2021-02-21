import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import styles from './list-page.module.css'
import ListCard from "../../components/list-card/list-card";
import ActiveListProvider from "../../contexts/active-list-context";

const ListPage = () => {
  return (
      <main className={styles.container}>
        <Sidebar />
        <section className={styles.content}>
            <ActiveListProvider>
                <ListCard />
            </ActiveListProvider>
        </section>
      </main>
  )
}

export default ListPage
