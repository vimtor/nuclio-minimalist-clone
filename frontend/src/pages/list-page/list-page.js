import Sidebar from "../../components/sidebar/sidebar";
import styles from './list-page.module.css'
import ListCard from "../../components/list-card/list-card";

const ListPage = () => {
  return (
      <main className={styles.container}>
        <Sidebar />
        <section className={styles.content}>
            <ListCard />
        </section>
      </main>
  )
}

export default ListPage
