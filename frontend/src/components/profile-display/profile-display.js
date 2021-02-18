import profileImage from "../../images/profile-placeholder.jpg";
import './profile-display.css'
import useAuth from "../../hooks/use-auth";
import {useHistory} from "react-router-dom";

const ProfileDisplay = () => {
    const history = useHistory()
    const {logout} = useAuth()

    const handleLogout = () => {
        logout()
        history.push("/login")
    }

    return (
        <section className="profile-display-container">
            <img className="profile-display-image" src={profileImage} alt="profile image"/>
            <div className="profile-display-content">
                <h3 className="profile-display-name">Anonymous</h3>
                <button className="profile-display-button" onClick={handleLogout}> 🖊 Edit profile</button>
                <button className="profile-display-button" onClick={handleLogout}> 🚪 Sign out</button>
            </div>
        </section>
    )
}

export default ProfileDisplay
