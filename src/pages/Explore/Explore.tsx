import React from "react";
import CardGrid from "../../components/CardGrid/CardGrid";
import { useCardContext } from "../../context/CardContext";
import HomeCard from "../../components/Card/HomeCard";
import styles from "./Explore.module.scss";
import LayoutSwitcher from "../../components/LayoutSwitcher/LayoutSwitcher";

const Explore: React.FC = () => {
    const { cards } = useCardContext();

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div>
                    <span className={styles.eyebrow}>THE OPEN ARCHIVE</span>
                    <h1>Explore ideas.</h1>
                    <p>A changing collection of things to notice, save, and make your own.</p>
                </div>
                <span className={styles.count}>{String(cards.length).padStart(2, "0")} <small>pieces to discover</small></span>
            </header>

            <div
                className={styles.layoutToolbar}
                aria-label="Choose content layout"
            >
                <LayoutSwitcher />
            </div>

            {cards.length ? (
                <CardGrid>
                    {cards.map((card) => <HomeCard key={card.id} {...card} />)}
                </CardGrid>
            ) : (
                <div className={styles.empty}>Your archive is quiet for now. Check back soon.</div>
            )}
        </main>
    );
};

export default Explore;
