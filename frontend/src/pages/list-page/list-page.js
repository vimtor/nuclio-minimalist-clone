import Sidebar from "../../components/sidebar/sidebar";
import styles from './list-page.module.css'

const ListPage = () => {
  return (
      <main className={styles.container}>
        <Sidebar />
        <section className={styles.content}>
        </section>
      </main>
  )
}

export default ListPage
