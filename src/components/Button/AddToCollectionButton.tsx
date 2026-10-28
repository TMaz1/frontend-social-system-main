import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";
import AddToCollectionModal from "../AddToCollectionModal/AddToCollectionModal";
import { useAddCardToCollection } from "../../hooks/collections/useAddCardToCollection";
import { useToast } from "../../context/ToastContext";
import { useCurrentUsername } from "../../hooks/user/useCurrentUsername";
import { cardToasts } from "../../utils/cardToasts";

interface Props {
    cardId: string;
}

export const AddToCollectionButton: React.FC<Props> = ({ cardId }) => {
    const [open, setOpen] = useState(false);

    const { showToast } = useToast();
    const navigate = useNavigate();
    const username = useCurrentUsername();

    const {
        collections,
        addCard,
        createCollection,
        isLoading,
        isAuthenticated,
    } = useAddCardToCollection(cardId);

    const handleOpen = () => {
        if (!isAuthenticated) {
            cardToasts.loginRequired(showToast);
            navigate("/login");
            return;
        }

        if (isLoading) return;

        setOpen(true);
    };

    const handleSelectCollection = (collectionId: string) => {
        addCard(collectionId);
        cardToasts.addedToCollection(showToast, username);
        setOpen(false);
    };

    const handleCreateCollection = (
        title: string,
        description: string
    ) => {
        const newId = createCollection(title, description);

        if (newId) {
            cardToasts.addedToNewCollection(showToast, username);
            setOpen(false);
        }
    };

    return (
        <>
            <button
                className={styles.addBtn}
                onClick={handleOpen}
                disabled={isLoading}
            >
                + Add to Collection
            </button>

            {open && (
                <AddToCollectionModal
                    collections={collections}
                    onClose={() => setOpen(false)}
                    onSelectCollection={handleSelectCollection}
                    onCreateCollection={handleCreateCollection}
                />
            )}
        </>
    );
};