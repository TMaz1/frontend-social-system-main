
import React from "react";
import { Link } from "react-router-dom";

type ShowToast = (message: React.ReactNode) => void;

const profileLink = (username: string | null) => {
    if (!username) return null;

    return (
        <>
            {" "}
            <Link to={`/profile/${username}`}>
                View Profile
            </Link>
        </>
    );
};

export const cardToasts = {
    loginRequired(showToast: ShowToast) {
        showToast("Please log in to save cards");
    },

    saved(showToast: ShowToast, username: string | null) {
        showToast(
            <>
                Card added to 'Saved' collection
                {profileLink(username)}
            </>
        );
    },

    unsaved(showToast: ShowToast, username: string | null) {
        showToast(
            <>
                Card removed from 'Saved' collection
                {profileLink(username)}
            </>
        );
    },

    addedToCollection(showToast: ShowToast, username: string | null) {
        showToast(
            <>
                Card successfully added to collection!
                {profileLink(username)}
            </>
        );
    },

    addedToNewCollection(showToast: ShowToast, username: string | null) {
        showToast(
            <>
                Card added to new collection!
                {profileLink(username)}
            </>
        );
    },
};