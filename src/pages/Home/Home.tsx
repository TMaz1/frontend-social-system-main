
import React from "react";
import { Link } from "react-router-dom";
import {
    FiArrowUpRight,
    FiLayers,
    FiGrid,
    FiBookmark,
} from "react-icons/fi";
import { useCardContext } from "../../context/CardContext";
import { ROUTES } from "../../config/routes";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
    const { cards } = useCardContext();
    const previews = cards
        .filter((card) => Boolean(card.image))
        .slice(0, 4);

    return (
        <main className={styles.home}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>
                        Collect what
                        <br />
                        moves you.
                    </h1>

                    <p className={styles.intro}>
                        A personal visual universe for ideas, inspiration,
                        and the things you want to find again. Gather the
                        good stuff. Make it yours.
                    </p>

                    <div className={styles.actions}>
                        <Link
                            to={ROUTES.EXPLORE}
                            className={styles.primaryAction}
                        >
                            Explore your world
                            <FiArrowUpRight aria-hidden="true" />
                        </Link>
                    </div>

                    <div className={styles.heroMeta}>
                        <span>Save what inspires you.</span>
                        <span>Make it your own.</span>
                    </div>
                </div>
            </section>

            <section
                className={styles.previewSection}
                aria-label="Platform preview"
            >
                <div className={styles.sectionHeading}>
                    <div>
                        <h2>Your world, in fragments.</h2>
                    </div>

                    <Link
                        to={ROUTES.EXPLORE}
                        className={styles.textLink}
                    >
                        Explore the archive <FiArrowUpRight />
                    </Link>
                </div>

                <div className={styles.previewGrid}>
                    <div className={styles.previewIntro}>
                        <div className={styles.previewIcon}>
                            <FiLayers />
                        </div>
                        <h3>
                            Ideas, gathered
                            <br />
                            with intention.
                        </h3>
                        <p>
                            Save visual references and bring your interests
                            into one considered space.
                        </p>
                    </div>

                    <div className={styles.imageMosaic}>
                        {previews.length > 0 ? (
                            previews.map((card, index) => (
                                <Link
                                    to={ROUTES.CARD_DETAIL(card.id)}
                                    key={card.id}
                                    className={`${styles.previewImage} ${styles[`image${index + 1}`]
                                        }`}
                                >
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        loading="lazy"
                                    />
                                    <span>{card.title}</span>
                                </Link>
                            ))
                        ) : (
                            <div className={styles.previewFallback}>
                                <FiGrid />
                                <span>
                                    Your visual archive starts here.
                                </span>
                            </div>
                        )}
                    </div>

                    <div className={styles.previewNote}>
                        <FiBookmark />
                        <p>
                            Build collections around the things you want
                            to come back to.
                        </p>
                        <Link to={ROUTES.EXPLORE}>
                            Find your next reference <FiArrowUpRight />
                        </Link>
                    </div>
                </div>
            </section>

            <section className={styles.manifesto}>
                <div className={styles.manifestoTitle}>
                    <h2>
                        Less noise.
                        <br />
                        More signal.
                    </h2>
                </div>

                <div className={styles.specGrid}>
                    <article>
                        <span>01</span>
                        <h3>Architecture</h3>
                        <p>
                            Client-side state with localStorage persistence
                            and a JSON-seeded demo environment.
                        </p>
                    </article>

                    <article>
                        <span>02</span>
                        <h3>Build stack</h3>
                        <p>
                            React, TypeScript, Vite, SCSS, and a
                            component-driven interface.
                        </p>
                    </article>

                    <article>
                        <span>03</span>
                        <h3>Layout engine</h3>
                        <p>
                            Switch between grid, dense grid, masonry,
                            tall, and landscape arrangements.
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
};

export default Home;