
import React, { useState } from "react";
import styles from "./AuthForm.module.scss";
import { useToast } from "../../context/ToastContext";
import PasswordInput from "./PasswordInput";
import { Link } from "react-router-dom";
import { useUpdatePassword } from "../../hooks/profile/useUpdatePassword";
import { AuthStatus } from "../../types/asyncState";
import { useCurrentUsername } from "../../hooks/user/useCurrentUsername";

interface Props {
    onClose: () => void;
}

const ResetPasswordForm: React.FC<Props> = ({ onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [saving, setSaving] = useState(false);

    const { showToast } = useToast();
    const result = useUpdatePassword();
    const username = useCurrentUsername();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (saving || result.status !== AuthStatus.Ready) return;

        setSaving(true);

        try {
            const res = await result.data.updatePassword({
                oldPassword,
                newPassword,
                confirmPassword,
            });

            if (!res.success) {
                showToast(
                    `${res.error || "Something went wrong."} Please try again.`
                );
                return;
            }

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

            onClose();

            showToast(
                <>
                    Password updated successfully!{" "}
                    <Link to={`/profile/${username}`}>
                        View Profile
                    </Link>
                </>
            );
        } catch {
            showToast(
                "Unable to update your password. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.resetPasswordContainer}>
            <div className={styles.resetPasswordHeader}>
                <p>Choose a new password to keep your account secure.</p>
            </div>

            <form
                className={styles.resetPasswordForm}
                onSubmit={handleSubmit}
            >
                <div className={styles.resetPasswordInputGroup}>
                    <label htmlFor="reset-old-password">
                        Old password
                    </label>
                    <PasswordInput
                        id="reset-old-password"
                        label="Old password"
                        value={oldPassword}
                        onChange={setOldPassword}
                        show={showOld}
                        onToggle={() => setShowOld((prev) => !prev)}
                    />
                </div>

                <div className={styles.resetPasswordInputGroup}>
                    <label htmlFor="reset-new-password">
                        New password
                    </label>
                    <PasswordInput
                        id="reset-new-password"
                        label="New password"
                        value={newPassword}
                        onChange={setNewPassword}
                        show={showNew}
                        onToggle={() => setShowNew((prev) => !prev)}
                    />
                </div>

                <div className={styles.resetPasswordInputGroup}>
                    <label htmlFor="reset-confirm-password">
                        Confirm new password
                    </label>
                    <PasswordInput
                        id="reset-confirm-password"
                        label="Confirm new password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        show={showConfirm}
                        onToggle={() => setShowConfirm((prev) => !prev)}
                    />
                </div>

                <div className={styles.resetPasswordButtonRow}>
                    <button
                        type="button"
                        className={styles.resetPasswordCancel}
                        onClick={onClose}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className={styles.resetPasswordConfirm}
                        disabled={saving || result.status !== AuthStatus.Ready}
                    >
                        {saving ? "Saving..." : "Update Password"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordForm;