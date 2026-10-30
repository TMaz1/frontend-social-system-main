
import React, { useState } from "react";
import styles from "./ProfileHeader.module.scss";
import SocialMediaLinks from "../ProfileLinks/SocialMediaLinks";
import type { Links } from "../../services/localDataService";
import { Link } from "react-router-dom";
import ComingSoonModal from "../EmptyStates/ComingSoonModal";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import { FiArrowUpRight } from "react-icons/fi";

interface Props {
    name: string;
    bio: string;
    profileImage: string;
    links: Links;
    share?: string;
    isOwnProfile: boolean;
}

const ProfileHeader: React.FC<Props> = ({
    name,
    bio,
    profileImage,
    links,
    share,
    isOwnProfile,
}) => {
    const [showModal, setShowModal] = useState(false);

    const displayName = name.trim() || "Untitled profile";
    const hasBio = Boolean(bio?.trim());

    return (
        <>
            <header className={styles.header}>
                <div className={styles.identity}>
                    <div className={styles.avatar}>
                        <ProfileAvatar
                            src={profileImage || undefined}
                            editable={isOwnProfile}
                            editLink="/profile/settings"
                        />
                    </div>

                    <div className={styles.text}>
                        <span className={styles.eyebrow}>
                            {isOwnProfile
                                ? "YOUR SPACE"
                                : "THE OPEN ARCHIVE"}
                        </span>

                        <h1 className={styles.title}>
                            {displayName}
                            <span className={styles.period}>.</span>
                        </h1>

                        <p
                            className={`${styles.bio} ${!hasBio ? styles.emptyBio : ""
                                }`}
                        >
                            {hasBio
                                ? bio.trim()
                                : "A space for things worth discovering."}
                        </p>
                    </div>
                </div>

                <div className={styles.footer}>
                    {isOwnProfile ? (
                        <Link
                            to="/profile/settings"
                            className={styles.primaryAction}
                        >
                            Edit profile
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className={styles.primaryAction}
                            onClick={() => setShowModal(true)}
                        >
                            Follow
                            <FiArrowUpRight aria-hidden="true" />
                        </button>
                    )}

                    <div className={styles.socials}>
                        <SocialMediaLinks
                            links={links}
                            share={share}
                        />
                    </div>
                </div>
            </header>

            <ComingSoonModal
                visible={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
};

export default ProfileHeader;