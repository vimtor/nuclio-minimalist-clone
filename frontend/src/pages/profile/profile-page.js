import Sidebar from "../../components/sidebar/sidebar";
import styles from "./profile-page.module.css";
import profileImage from "../../images/profile-placeholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import CompletedTasksChart from "../../components/completed-tasks-chart/completed-tasks-chart";
import ChartProvider from "../../contexts/chart-context";
import useUsers from "../../hooks/use-users";
import api from "../../helpers/api";
import { useEffect, useState } from "react/cjs/react.production.min";
import useAuth from "../../hooks/use-auth";
import ProfileImage from "../../components/profile-image/profile-image";
import ProfileInfo from "../../components/profile-info/profile-info";
import ProfileDisplay from "../../components/profile-display/profile-display";
import UserProvider from "../../contexts/users-context";

const ProfilePage = () => {
  const { activeUser, alias, avatar } = useUsers();

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
