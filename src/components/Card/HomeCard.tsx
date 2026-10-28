import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card, { type CardProps } from "../Card/Card";
import styles from "./Card.module.scss";
import AddToCollectionModal from "../AddToCollectionModal/AddToCollectionModal";
import { useSaveCard } from "../../hooks/cards/useSaveCard";
import { useAddCardToCollection } from "../../hooks/collections/useAddCardToCollection";
import ImageLightbox from "../ImageLightbox/ImageLightbox";
import { useToast } from "../../context/ToastContext";
import { cardToasts } from "../../utils/cardToasts";
import { useCurrentUsername } from "../../hooks/user/useCurrentUsername";

interface HomeCardProps extends Omit<CardProps, "collectionIds"> { }

interface HomeCardOptionalProps {
    reorderMode?: boolean;
}

const LONG_PRESS_TIME = 450;
const MENU_WIDTH = 180;
const MENU_HEIGHT = 150;
const MENU_EDGE = 8;

const HomeCard: React.FC<HomeCardProps & HomeCardOptionalProps> = ({
    id: cardId,
    reorderMode,
    ...props
}) => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const username = useCurrentUsername();

    const {
        isSaved,
        toggleSave,
        isAuthenticated: isSaveAuth,
    } = useSaveCard(cardId);

    const {
        collections,
        addCard,
        createCollection,
        isAuthenticated: isCollectionAuth,
    } = useAddCardToCollection(cardId);

    const isAuthenticated = isSaveAuth && isCollectionAuth;

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [collectionModalOpen, setCollectionModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);

    const pressTimer = useRef<number | null>(null);
    const isPressing = useRef(false);
    const longPressTriggered = useRef(false);
    const suppressClickRef = useRef(false);

    const isMobile = window.innerWidth <= 1024;

    const clearPressTimer = () => {
        if (pressTimer.current !== null) {
            window.clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }
    };

    useEffect(() => {
        return () => {
            clearPressTimer();
        };
    }, []);

    // --------------------------------
    // Long-press handling
    // --------------------------------

    const handlePressStart = (
        e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
    ) => {
        if (reorderMode || !isAuthenticated) return;

        if (
            e.target instanceof Element &&
            e.target.closest(`.${styles.menu}, .${styles.bottomSheet}`)
        ) {
            return;
        }

        if ("button" in e && e.button !== 0) return;

        clearPressTimer();

        isPressing.current = true;
        longPressTriggered.current = false;

        const point = "touches" in e ? e.touches[0] : e;
        const startX = point.clientX;
        const startY = point.clientY;

        pressTimer.current = window.setTimeout(() => {
            if (!isPressing.current) return;

            longPressTriggered.current = true;
            suppressClickRef.current = true;

            const menuX = Math.max(
                MENU_EDGE,
                Math.min(
                    startX + 8,
                    window.innerWidth - MENU_WIDTH - MENU_EDGE
                )
            );

            const menuY = Math.max(
                MENU_EDGE,
                Math.min(
                    startY + 8,
                    window.innerHeight - MENU_HEIGHT - MENU_EDGE
                )
            );

            setMenuPosition({ x: menuX, y: menuY });
            setMenuOpen(true);
        }, LONG_PRESS_TIME);
    };

    const handlePressEnd = () => {
        isPressing.current = false;
        clearPressTimer();
    };

    // --------------------------------
    // Navigation
    // --------------------------------

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;

        // Never navigate while a modal or menu is active.
        if (viewModalOpen || collectionModalOpen || menuOpen) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        // Consume the click associated with a long press.
        if (suppressClickRef.current || longPressTriggered.current) {
            e.preventDefault();
            e.stopPropagation();

            suppressClickRef.current = false;
            longPressTriggered.current = false;
            return;
        }

        if (!reorderMode) {
            navigate(`/card/${cardId}`);
        }
    };

    // --------------------------------
    // Menu actions
    // --------------------------------

    const handleView = () => {
        setMenuOpen(false);
        setViewModalOpen(true);
    };

    const handleSave = () => {
        if (!isSaveAuth) {
            setMenuOpen(false);
            cardToasts.loginRequired(showToast);
            navigate("/login");
            return;
        }

        setMenuOpen(false);

        const wasSaved = isSaved;
        toggleSave();

        if (wasSaved) {
            cardToasts.unsaved(showToast, username);
        } else {
            cardToasts.saved(showToast, username);
        }
    };

    const handleAddToCollection = () => {
        setMenuOpen(false);
        setCollectionModalOpen(true);
    };

    const handleSelectCollection = (collectionId: string) => {
        addCard(collectionId);
        setCollectionModalOpen(false);

        cardToasts.addedToCollection(showToast, username);
    };

    const handleCreateCollection = (
        title: string,
        description: string
    ) => {
        const newId = createCollection(title, description);

        if (newId) {
            setCollectionModalOpen(false);
            cardToasts.addedToNewCollection(showToast, username);
        }
    };

    // --------------------------------
    // Render
    // --------------------------------

    return (
        <div
            className={styles.wrapper}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            onTouchCancel={handlePressEnd}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onClick={handleCardClick}
        >
            <Card {...props} id={cardId} />

            {/* Desktop Quick Actions Menu */}
            {menuOpen && !isMobile && (
                <div
                    className={styles.menu}
                    style={{
                        position: "fixed",
                        top: menuPosition.y,
                        left: menuPosition.x,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        className={styles.menuItem}
                        onClick={handleView}
                    >
                        View
                    </button>

                    <button
                        type="button"
                        className={styles.menuItem}
                        onClick={handleSave}
                    >
                        {isSaved ? "Unsave" : "Save"}
                    </button>

                    <button
                        type="button"
                        className={styles.menuItem}
                        onClick={handleAddToCollection}
                    >
                        Add to Collection
                    </button>
                </div>
            )}

            {/* Mobile Bottom Sheet Menu */}
            {menuOpen && isMobile && (
                <div
                    className={styles.bottomSheet}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        className={styles.menuItem}
                        onClick={handleView}
                    >
                        View
                    </button>

                    <button
                        type="button"
                        className={styles.menuItem}
                        onClick={handleSave}
                    >
                        {isSaved ? "Unsave" : "Save"}
                    </button>

                    <button
                        type="button"
                        className={styles.menuItem}
                        onClick={handleAddToCollection}
                    >
                        Add to Collection
                    </button>

                    <button
                        type="button"
                        className={styles.menuItemCancel}
                        onClick={() => setMenuOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Add to Collection Modal */}
            {collectionModalOpen && (
                <AddToCollectionModal
                    collections={collections}
                    onClose={() => setCollectionModalOpen(false)}
                    onSelectCollection={handleSelectCollection}
                    onCreateCollection={handleCreateCollection}
                />
            )}

            {/* Shared Image Lightbox */}
            {props.image && (
                <ImageLightbox
                    visible={viewModalOpen}
                    onClose={() => setViewModalOpen(false)}
                    image={props.image}
                    title={props.title}
                    description={props.fullDescription}
                />
            )}
        </div>
    );
};

export default HomeCard;