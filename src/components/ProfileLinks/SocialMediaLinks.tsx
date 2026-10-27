import React from "react";
import {
    FiInstagram,
    FiYoutube,
    FiTwitter,
    FiShare2,
    FiGlobe,
} from "react-icons/fi";
import {
    FaTiktok,
    FaPinterestP,
    FaTwitch,
} from "react-icons/fa";

import styles from "./SocialMediaLinks.module.scss";
import type { Links } from "../../services/localDataService";
import { useShare } from "../../hooks/useShare";

interface Props {
    links: Links;
    share?: string;
}

const iconMap = {
    instagram: <FiInstagram />,
    youtube: <FiYoutube />,
    twitter: <FiTwitter />,
    tiktok: <FaTiktok />,
    pinterest: <FaPinterestP />,
    twitch: <FaTwitch />,
    website: <FiGlobe />,
} as const;

const SocialMediaLinks: React.FC<Props> = ({ links, share: shareUrl }) => {
    const platforms = Object.keys(iconMap) as Array<keyof typeof iconMap>;
    const { share, status } = useShare();

    const normaliseUrl = (url: string) => {
        if (!url) return "";

        if (/^https?:\/\//i.test(url)) {
            return url;
        }

        return `https://${url}`;
    };

    const handleShare = () => {
        if (!shareUrl) return;

        void share({
            url: shareUrl,
            title: "Check out this profile",
            text: "Take a look at this profile.",
        });
    };

    return (
        <div className={styles.socials}>
            {platforms.map((platform) => {
                const url = links[platform];

                if (!url) return null;

                return (
                    <a
                        key={platform}
                        href={normaliseUrl(url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={platform}
                        title={platform}
                    >
                        {iconMap[platform]}
                    </a>
                );
            })}

            {shareUrl && (
                <button
                    type="button"
                    className={styles.shareButton}
                    onClick={handleShare}
                    aria-label="Share profile"
                    title="Share profile"
                >
                    <FiShare2 />
                </button>
            )}

            {status === "copied" && (
                <span role="status" className={styles.shareStatus}>
                    Link copied!
                </span>
            )}

            {status === "error" && (
                <span role="status" className={styles.shareStatus}>
                    Couldn't share the link.
                </span>
            )}
        </div>
    );
};

export default SocialMediaLinks;