import React, { useEffect, useState, useCallback } from "react";
import styles from "./ProfilePageContent.module.scss";
import buttonStyles from "../../components/Button/Button.module.scss";

import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import DraggableCardGrid from "../../components/DraggableCardGrid/DraggableCardGrid";
import NavbarCollections, {
    type CollectionTab,
} from "../../components/NavbarCollections/NavbarCollections";

import { type User } from "../../services/localDataService";
import CollectionModal from "../../components/AddToCollectionModal/CollectionModal";

import { useReorderContext } from "../../context/ReorderContext";
import { useUserCollections } from "../../hooks/collections/useUserCollections";
import InlineLoader from "../Loader/InlineLoader/InlineLoader";
import DeleteCollectionModal from "../DeleteCollectionModal/DeleteCollectionModal";

interface Props {
    user: User;
    isOwnProfile: boolean;
}

const ProfilePageContent: React.FC<Props> = ({
    user,
    isOwnProfile,
}) => {
    const {
        isLoading,
        collections,
        reorderCollections,
        deleteCollection,
        createCollection,
        updateCollection,
        getCollectionDescription,
    } = useUserCollections(user.userId, isOwnProfile);

    const [modalState, setModalState] = useState<null | {
        mode: "create" | "edit";
        collectionId?: string;
        initialTitle?: string;
        initialDescription?: string;
    }>(null);

    const [collectionToDelete, setCollectionToDelete] =
        useState<CollectionTab | null>(null);

    const [selectedCollection, setSelectedCollection] =
        useState("uploaded");

    const {
        reorderMode,
        beginReorder,
        endReorder,
        triggerExitModal,
    } = useReorderContext();

    useEffect(() => {
        if (reorderMode) {
            endReorder();
        }
    }, [selectedCollection]);

    const currentDescription = isLoading
        ? ""
        : getCollectionDescription(selectedCollection);

    // =========================
    // COLLECTION HANDLERS
    // =========================

    const handleCollectionReorder = useCallback(
        (newOrder: CollectionTab[]) => {
            reorderCollections(newOrder);
        },
        [reorderCollections]
    );

    // Only allow reordering collections on your own profile.
    const requestCollectionReorder = () => {
        if (!isOwnProfile) return;
        beginReorder();
    };

    // Open confirmation instead of deleting immediately.
    const handleCollectionDelete = (col: CollectionTab) => {
        if (!isOwnProfile) return;
        if (col.id === "uploaded" || col.id === "saved") return;

        setCollectionToDelete(col);
    };

    // Delete only after the user confirms.
    const handleConfirmDelete = () => {
        if (!collectionToDelete) return;

        const collectionId = collectionToDelete.id;

        deleteCollection(collectionId);

        if (selectedCollection === collectionId) {
            setSelectedCollection("uploaded");
        }

        setCollectionToDelete(null);
    };

    const handleCancelDelete = () => {
        setCollectionToDelete(null);
    };

    const handleCollectionAdd = () => {
        setModalState({ mode: "create" });
    };

    const handleEditCollection = (col: CollectionTab) => {
        setModalState({
            mode: "edit",
            collectionId: col.id,
            initialTitle: col.title ?? "",
            initialDescription: col.description ?? "",
        });
    };

    const handleModalConfirm = (
        title: string,
        description: string
    ) => {
        if (!modalState) return;

        if (modalState.mode === "create") {
            createCollection(title, description);
        } else if (
            modalState.mode === "edit" &&
            modalState.collectionId
        ) {
            updateCollection(
                modalState.collectionId,
                title,
                description
            );
        }

        setModalState(null);
    };

    return (
        <div className={styles.container}>
            <ProfileHeader
                name={user.profileName ?? ""}
                bio={user.profileBio ?? ""}
                profileImage={user.profileImageUrl ?? ""}
                links={user.links ?? {}}
                share={`https://app.com/profile/${user.username}`}
                isOwnProfile={isOwnProfile}
            />

            {isLoading ? (
                <InlineLoader />
            ) : (
                <>
                    <div className={styles.navbarRow}>
                        <NavbarCollections
                            selected={selectedCollection}
                            onSelect={(newCol) => {
                                if (reorderMode) {
                                    triggerExitModal(() =>
                                        setSelectedCollection(newCol)
                                    );
                                } else {
                                    setSelectedCollection(newCol);
                                }
                            }}
                            collections={collections}
                            reorderMode={reorderMode && isOwnProfile}
                            onReorder={handleCollectionReorder}
                            onReorderRequest={requestCollectionReorder}
                            onDelete={handleCollectionDelete}
                            onAddNew={handleCollectionAdd}
                            onEdit={handleEditCollection}
                            isOwnProfile={isOwnProfile}
                        />
                    </div>

                    {/* Existing create/edit modal */}
                    {modalState && (
                        <CollectionModal
                            mode={modalState.mode}
                            initialTitle={modalState.initialTitle}
                            initialDescription={
                                modalState.initialDescription
                            }
                            onCancel={() => setModalState(null)}
                            onConfirm={handleModalConfirm}
                        />
                    )}

                    {/* Delete confirmation modal */}
                    <DeleteCollectionModal
                        collection={collectionToDelete}
                        onCancel={handleCancelDelete}
                        onConfirm={handleConfirmDelete}
                    />

                    {selectedCollection !== "uploaded" &&
                        selectedCollection !== "saved" && (
                            <div
                                className={`${styles.collectionHeaderRow} ${reorderMode ? styles.reordering : ""
                                    }`}
                            >
                                {currentDescription && (
                                    <div
                                        className={
                                            styles.collectionDescription
                                        }
                                    >
                                        {currentDescription}
                                    </div>
                                )}

                                {reorderMode && (
                                    <button
                                        type="button"
                                        className={buttonStyles.doneBtn}
                                        onClick={endReorder}
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        )}

                    <DraggableCardGrid
                        userId={user.userId}
                        selectedCollection={selectedCollection}
                        isOwnProfile={isOwnProfile}
                    />
                </>
            )}
        </div>
    );
};

export default ProfilePageContent;