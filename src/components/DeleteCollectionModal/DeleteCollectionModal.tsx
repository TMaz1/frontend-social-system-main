
import React from "react";
import Modal from "../Modal/Modal";
import type { CollectionTab } from "../NavbarCollections/NavbarCollections";

interface DeleteCollectionModalProps {
    collection: CollectionTab | null;
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteCollectionModal: React.FC<DeleteCollectionModalProps> = ({
    collection,
    onCancel,
    onConfirm,
}) => {
    return (
        <Modal
            visible={collection !== null}
            title="Delete collection?"
            content={
                <>
                    <p>
                        Are you sure you want to delete{" "}
                        <strong>{collection?.title}</strong>? <br />
                        This action cannot be undone.
                    </p>
                </>
            }
            buttons={[
                {
                    label: "Cancel",
                    variant: "secondary",
                    onClick: onCancel,
                },
                {
                    label: "Yes, delete",
                    variant: "primary",
                    onClick: onConfirm,
                },
            ]}
            onClose={onCancel}
        />
    );
};

export default DeleteCollectionModal;