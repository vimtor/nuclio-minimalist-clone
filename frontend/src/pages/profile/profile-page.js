import Sidebar from "../../components/sidebar/sidebar";
import styles from "./profile-page.module.css";
import CompletedTasksChart from "../../components/completed-tasks-chart/completed-tasks-chart";
import ChartProvider from "../../contexts/chart-context";
import ProfileInfo from "../../components/profile-info/profile-info";
import UserProvider from "../../contexts/users-context";

const ProfilePage = () => {
  return (
    <main className={styles.container}>
      <Sidebar />
      <section className={styles.content}>
        <div className={styles.profileBox}>
          <h2>Profile</h2>
          <div className={styles.profileConent}>
            <div className={styles.userInfo}>
              <UserProvider>
                <ProfileInfo />
              </UserProvider>
            </div>

            <div className={styles.moreInfo}>
              <ChartProvider>
                <CompletedTasksChart />
              </ChartProvider>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
