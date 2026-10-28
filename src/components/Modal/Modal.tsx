import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

interface ModalButton {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
}

interface ReusableModalProps {
    visible: boolean;
    title?: string;
    content?: React.ReactNode;
    buttons?: ModalButton[];
    onClose?: () => void;
    bottomSpacing?: boolean;
    imageMode?: boolean;
}

const Modal: React.FC<ReusableModalProps> = ({
    visible,
    title,
    content,
    buttons = [],
    onClose,
    bottomSpacing = true,
    imageMode = false,
}) => {
    if (!visible) return null;

    const renderButtons = () => {
        if (buttons.length === 1) {
            return (
                <div className={styles.singleButton}>
                    <button
                        className={
                            buttons[0].variant === "primary"
                                ? styles.confirmBtn
                                : styles.cancelBtn
                        }
                        onClick={buttons[0].onClick}
                    >
                        {buttons[0].label}
                    </button>
                </div>
            );
        }

        if (buttons.length === 2) {
            return (
                <div className={styles.twoButtons}>
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={
                                button.variant === "primary"
                                    ? styles.confirmBtn
                                    : styles.cancelBtn
                            }
                            onClick={button.onClick}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            );
        }

        if (buttons.length === 3) {
            return (
                <div className={styles.threeButtons}>
                    <button
                        className={
                            buttons[0].variant === "primary"
                                ? styles.confirmBtn
                                : styles.cancelBtn
                        }
                        onClick={buttons[0].onClick}
                    >
                        {buttons[0].label}
                    </button>

                    <div className={styles.rightButtons}>
                        {buttons.slice(1).map((button, index) => (
                            <button
                                key={index}
                                className={
                                    button.variant === "primary"
                                        ? styles.confirmBtn
                                        : styles.cancelBtn
                                }
                                onClick={button.onClick}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        return null;
    };


    return createPortal(
        <div
            className={`${styles.overlay} ${imageMode ? styles.imageOverlay : ""
                }`}
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={imageMode ? "Image viewer" : title || "Dialog"}
                className={[
                    styles.modal,
                    bottomSpacing ? "" : styles.noBottomSpacing,
                    imageMode ? styles.imageModal : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                onClick={(e) => e.stopPropagation()}
            >
                {imageMode && (
                    <button
                        type="button"
                        className={styles.imageClose}
                        onClick={onClose}
                        aria-label="Close image viewer"
                        autoFocus
                    >
                        ×
                    </button>
                )}

                {title && <h2 className={styles.heading}>{title}</h2>}

                {content && (
                    <div
                        className={
                            imageMode
                                ? styles.imageContent
                                : styles.content
                        }
                    >
                        {content}
                    </div>
                )}

                {buttons.length > 0 && (
                    <div className={styles.modalFooter}>
                        {renderButtons()}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default Modal;