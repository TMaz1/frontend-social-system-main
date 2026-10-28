
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./ImageLightbox.module.scss";

interface ImageLightboxProps {
    visible: boolean;
    image: string;
    title: string;
    description?: string;
    onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
    visible,
    image,
    title,
    description,
    onClose,
}) => {
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);

    useEffect(() => {
        if (visible) {
            setDescriptionExpanded(false);
        }
    }, [visible, image]);

    if (!image) return null;

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            imageMode
            content={
                <div className={styles.lightbox}>
                    <img
                        src={image}
                        alt={title}
                        className={styles.image}
                    />

                    <div className={styles.details}>
                        <h2 className={styles.title}>{title}</h2>

                        {description && (
                            <>
                                <div
                                    className={`${styles.descriptionWrapper} ${descriptionExpanded
                                            ? styles.expanded
                                            : ""
                                        }`}
                                >
                                    <p className={styles.description}>
                                        {description}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={styles.descriptionToggle}
                                    onClick={() =>
                                        setDescriptionExpanded(
                                            (expanded) => !expanded
                                        )
                                    }
                                    aria-expanded={descriptionExpanded}
                                >
                                    {descriptionExpanded
                                        ? "Show less −"
                                        : "Read more +"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            }
        />
    );
};

export default ImageLightbox;