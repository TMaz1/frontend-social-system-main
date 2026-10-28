import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CardDetailContent.module.scss";
import type { CardProps } from "../Card/Card";
import { SaveButton } from "../Button/SaveButton";
import { AddToCollectionButton } from "../Button/AddToCollectionButton";
import { localDataService } from "../../services/localDataService";
import Modal from "../Modal/Modal";

interface Props {
    card: CardProps;
}

const CardDetailContent: React.FC<Props> = ({ card }) => {
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);

    useEffect(() => {
        if (imageModalOpen) {
            setDescriptionExpanded(false);
        }
    }, [imageModalOpen]);

    const user = useMemo(() => {
        return card ? localDataService.getUserById(card.userId) : undefined;
    }, [card]);

    if (!card) {
        return (
            <div className={styles.empty}>
                <span className={styles.eyebrow}>THE OPEN ARCHIVE</span>
                <h1 className={styles.emptyTitle}>Piece not found.</h1>
                <p className={styles.emptyDescription}>
                    This piece may have been removed or is no longer available.
                </p>
                <Link to="/explore" className={styles.backLink}>
                    Back to explore <span aria-hidden="true">→</span>
                </Link>
            </div>
        );
    }

    const publishedDate = new Date(card.createdAt);
    const formattedDate = Number.isNaN(publishedDate.getTime())
        ? null
        : publishedDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <>
            <article className={styles.container}>
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        {card.image ? (
                            <button
                                type="button"
                                className={styles.imageButton}
                                onClick={() => setImageModalOpen(true)}
                                aria-label={`View ${card.title} image in full size`}
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className={styles.image}
                                />
                                <span className={styles.imageHint}>
                                    <span aria-hidden="true">⤢</span>
                                    View image
                                </span>
                            </button>
                        ) : (
                            <div className={styles.imagePlaceholder}>
                                <span>No image available</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.info}>
                    <div className={styles.intro}>
                        <span className={styles.eyebrow}>THE OPEN ARCHIVE</span>

                        {user && (
                            <Link
                                to={`/profile/${user.username}`}
                                className={styles.creator}
                            >
                                {user.profileImageUrl ? (
                                    <img
                                        src={user.profileImageUrl}
                                        alt=""
                                        className={styles.creatorAvatar}
                                    />
                                ) : (
                                    <span
                                        className={styles.creatorAvatarFallback}
                                        aria-hidden="true"
                                    >
                                        {user.username.charAt(0).toUpperCase()}
                                    </span>
                                )}

                                <span className={styles.creatorDetails}>
                                    <span className={styles.creatorLabel}>
                                        CONTRIBUTED BY
                                    </span>
                                    <span className={styles.creatorName}>
                                        {user.username}
                                    </span>
                                </span>

                                <span
                                    className={styles.creatorArrow}
                                    aria-hidden="true"
                                >
                                    ↗
                                </span>
                            </Link>
                        )}
                    </div>

                    <h1 className={styles.title}>{card.title}</h1>

                    {card.fullDescription && (
                        <div className={styles.description}>
                            <p>{card.fullDescription}</p>

                            {card.link && (
                                <a
                                    href={card.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.inlineLink}
                                >
                                    Visit original source
                                    <span aria-hidden="true">↗</span>
                                </a>
                            )}
                        </div>
                    )}

                    {card.hashtags && card.hashtags.length > 0 && (
                        <div className={styles.hashtags}>
                            <div className={styles.tagList}>
                                {card.hashtags.map((tag) => (
                                    <span key={tag} className={styles.tag}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.meta}>
                        <span className={styles.metaLabel}>PUBLISHED</span>
                        <span className={styles.metaValue}>
                            {formattedDate ?? "Date unavailable"}
                        </span>
                    </div>

                    <div className={styles.actions}>
                        <span className={styles.sectionLabel}>
                            Keep this piece
                        </span>

                        <div className={styles.actionsRow}>
                            <SaveButton cardId={card.id} />
                            <AddToCollectionButton cardId={card.id} />
                        </div>
                    </div>
                </div>
            </article>

            {card.image && (
                <Modal
                    visible={imageModalOpen}
                    onClose={() => setImageModalOpen(false)}
                    imageMode

                    content={
                        <div className={styles.lightbox}>
                            <img
                                src={card.image}
                                alt={card.title}
                                className={styles.lightboxImage}
                            />

                            <div className={styles.lightboxDetails}>
                                <h2 className={styles.lightboxTitle}>
                                    {card.title}
                                </h2>

                                {card.fullDescription && (
                                    <div
                                        className={`${styles.lightboxDescriptionWrapper} ${descriptionExpanded ? styles.descriptionExpanded : ""
                                            }`}
                                    >
                                        <p className={styles.lightboxDescription}>
                                            {card.fullDescription}
                                        </p>
                                    </div>
                                )}

                                {card.fullDescription && (
                                    <button
                                        type="button"
                                        className={styles.descriptionToggle}
                                        onClick={() =>
                                            setDescriptionExpanded((expanded) => !expanded)
                                        }
                                        aria-expanded={descriptionExpanded}
                                    >
                                        {descriptionExpanded ? "Show less −" : "Read more +"}
                                    </button>
                                )}
                            </div>
                        </div>
                    }
                />
            )}
        </>
    );
};

export default CardDetailContent;