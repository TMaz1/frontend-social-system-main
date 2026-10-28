
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";
import { useSaveCard } from "../../hooks/cards/useSaveCard";
import { useToast } from "../../context/ToastContext";
import { cardToasts } from "../../utils/cardToasts";
import { useCurrentUsername } from "../../hooks/user/useCurrentUsername";

interface Props {
    cardId: string;
}

export const SaveButton: React.FC<Props> = ({ cardId }) => {
    const {
        isSaved,
        toggleSave,
        isLoading,
        isAuthenticated,
    } = useSaveCard(cardId);

    const { showToast } = useToast();
    const navigate = useNavigate();
    const username = useCurrentUsername();

    const handleClick = () => {
        if (!isAuthenticated) {
            cardToasts.loginRequired(showToast);
            navigate("/login");
            return;
        }

        if (isLoading) return;

        const wasSaved = isSaved;

        toggleSave();

        if (wasSaved) {
            cardToasts.unsaved(showToast, username);
        } else {
            cardToasts.saved(showToast, username);
        }
    };

    return (
        <button
            className={`${styles.saveBtn} ${isSaved ? styles.active : ""}`}
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading
                ? "☆ Save"
                : isSaved
                    ? "★ Saved"
                    : "☆ Save"}
        </button>
    );
};