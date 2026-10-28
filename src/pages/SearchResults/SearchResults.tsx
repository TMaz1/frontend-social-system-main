import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCardContext } from "../../context/CardContext";
import CardGrid from "../../components/CardGrid/CardGrid";
import Card from "../../components/Card/Card";
import NoSearch from "../../components/EmptyStates/NoSearch";
import styles from "./SearchResults.module.scss";
import type { CardProps } from "../../components/Card/Card";
import { FiSearch } from "react-icons/fi";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
    const navigate = useNavigate();

    const { cards } = useCardContext();
    const query = useQuery().get("q")?.toLowerCase() || "";

    // Show NoSearch if query is empty
    if (!query.trim()) {
        return <NoSearch />;
    }

    const results: CardProps[] = useMemo(() => {
        if (!query.trim()) return [];

        const exactTitle = cards.filter((c) =>
            c.title.toLowerCase().startsWith(query)
        );

        const partialTitle = cards.filter(
            (c) =>
                !exactTitle.includes(c) &&
                c.title.toLowerCase().includes(query)
        );

        const descMatches = cards.filter(
            (c) =>
                !exactTitle.includes(c) &&
                !partialTitle.includes(c) &&
                (
                    c.shortDescription?.toLowerCase().includes(query) ||
                    c.fullDescription?.toLowerCase().includes(query)
                )
        );

        const hashtagMatches = cards.filter(
            (c) =>
                !exactTitle.includes(c) &&
                !partialTitle.includes(c) &&
                !descMatches.includes(c) &&
                c.hashtags?.some((tag) => tag.toLowerCase().includes(query))
        );

        return [...exactTitle, ...partialTitle, ...descMatches, ...hashtagMatches];
    }, [cards, query]);

    const handleClick = (cardId: CardProps["id"]) => {
        navigate(`/card/${cardId}`);
    };

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headingContent}>
                    <span className={styles.eyebrow}>
                        THE OPEN ARCHIVE
                    </span>

                    <h1>
                        Search results<span className={styles.period}>.</span>
                    </h1>

                    <p className={styles.description}>
                        {results.length > 0
                            ? `Things to discover matching "${query}".`
                            : `Nothing to surface for "${query}".`}
                    </p>
                </div>

                <span className={styles.count}>
                    {String(results.length).padStart(2, "0")}
                    <small>
                        {results.length === 1
                            ? "piece found"
                            : "pieces found"}
                    </small>
                </span>
            </header>

            {results.length > 0 ? (
                <div className={styles.gridContainer}>
                    <CardGrid>
                        {results.map((card) => (
                            <div
                                key={card.id}
                                onClick={() => handleClick(card.id)}
                                className={styles.cardWrapper}
                            >
                                <Card {...card} />
                            </div>
                        ))}
                    </CardGrid>
                </div>
            ) : (
                <div className={styles.empty}>
                    <FiSearch className={styles.emptyIcon} />

                    <h2>No matches this time.</h2>

                    <p>
                        Try another phrase, or search for a title,
                        description, or hashtag.
                    </p>
                </div>
            )}
        </main>
    );
};

export default SearchResults;