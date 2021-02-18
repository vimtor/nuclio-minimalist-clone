import {useState} from 'react'
import styles from './profile-page.module.css';

import Sidebar from "../../components/sidebar/sidebar";
import profileImage from "../../images/profile-placeholder.jpg";

const ProfilePage = () => {
    return (
        <main className={styles.container}>
            <Sidebar />
            <section className={styles.content}>
                <div className={styles.profile_box}>
                    <h1>Edit profile</h1>
                    <div className={styles.profile_box_content}>
                        <img className={styles.profile_image} src={profileImage} alt="profile image"/>
                        <button> 📷 Change image</button>
                        <input className={styles.profile_input} type="text" />
                        <button className={styles.save_button}> 💾 Save</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ProfilePage
