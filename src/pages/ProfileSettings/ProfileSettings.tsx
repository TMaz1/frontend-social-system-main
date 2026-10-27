import React from "react";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileSettings.module.scss";
import buttonStyles from "../../components/Button/Button.module.scss";

const ProfileSettings: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <button className={buttonStyles.back} onClick={() => navigate(-1)}>
                ← Back
            </button>

            <ProfileEdit />
        </div>
    );
};

export default ProfileSettings;