import Sidebar from "../../components/sidebar/sidebar";
import styles from './profile-page.module.css';
import profileImage from "../../images/profile-placeholder.jpg";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import CompletedTasksGraph from "../../components/completed-tasks-graph/completed-tasks-graph";
import TasksProvider from "../../contexts/tasks-context";


const ProfilePage = () => {
    return (
        <main className={styles.container}>
            <Sidebar/>
            <section className={styles.content}>
                <div className={styles.profileBox}>
                    <h2>Profile</h2>
                    <div className={styles.profileConent}>
                        <div className={styles.userInfo}>
                            <img className="profile-display-image" src={profileImage} alt="profile image"/>

                            <ul className={styles.inputBox}>
                                {/*<label>Name: </label>*/}
                                {/*<input tyle="text" value="Paco" />*/}
                                <li>Paco</li>
                                <li>Email@email.com</li>
                                <li>
                                    <button>
                                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.moreInfo}>
                            <TasksProvider>
                                <CompletedTasksGraph/>
                            </TasksProvider>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ProfilePage
