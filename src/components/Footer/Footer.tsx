
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";
import { useCurrentUsername } from "../../hooks/user/useCurrentUsername";

import styles from "./Footer.module.scss";
import { APP_CONFIG } from "../../config/appConfig";
import { ROUTES } from "../../config/routes";

const Footer: React.FC = () => {
    const [showTop, setShowTop] = useState(false);
    const username = useCurrentUsername();

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 200);

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <p className={styles.brandName}>
                            Your visual archive.
                        </p>

                        <p className={styles.brandDescription}>
                            A personal space for ideas, inspiration,
                            and everything worth keeping.
                        </p>
                    </div>

                    <div className={styles.grid}>
                        <section className={styles.column}>
                            <h3>Discover</h3>
                            <Link to={ROUTES.HOME}>Home</Link>
                            <Link to={ROUTES.EXPLORE}>Explore</Link>
                            <Link to={ROUTES.SEARCH}>Search</Link>
                        </section>

                        <section className={styles.column}>
                            <h3>Account</h3>

                            {username ? (
                                <>
                                    <Link to={ROUTES.PROFILE(username)}>
                                        Profile
                                    </Link>
                                    <Link to={ROUTES.PROFILE_SETTINGS}>
                                        Settings
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to={ROUTES.SIGNUP}>
                                        Create account
                                    </Link>
                                    <Link to={ROUTES.LOGIN}>
                                        Log in
                                    </Link>
                                </>
                            )}
                        </section>

                        <section className={styles.column}>
                            <h3>Elsewhere</h3>

                            <a
                                href="https://www.linkedin.com/in/tayyaba-maz/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>

                            <a
                                href="https://github.com/tmaz1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Github
                            </a>

                            <a href="mailto:tayyabamazhar001@gmail.com">
                                Get in touch
                            </a>
                        </section>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>
                        {APP_CONFIG.getCopyright()}
                    </p>

                    <p className={styles.footerNote}>
                        Made for the things that move you.
                    </p>
                </div>
            </div>

            {showTop && (
                <button
                    type="button"
                    className={styles.backToTop}
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    title="Back to top"
                >
                    <FiArrowUp aria-hidden="true" />
                </button>
            )}
        </footer>
    );
};

export default Footer;