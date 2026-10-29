
import React from "react";
import { FiLock, FiUnlock } from "react-icons/fi";
import styles from "./AuthForm.module.scss";

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
    show: boolean;
    onToggle: () => void;
    placeholder?: string;
    id?: string;
}

const PasswordInput: React.FC<Props> = ({
    label,
    value,
    onChange,
    show,
    onToggle,
    placeholder,
    id,
}) => {
    return (
        <div className={styles.passwordWrapper}>
            <input
                id={id}
                type={show ? "text" : "password"}
                placeholder={placeholder || label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            <button
                type="button"
                className={styles.hideIcon}
                onClick={onToggle}
                aria-label={show ? "Hide password" : "Show password"}
                aria-pressed={show}
            >
                {show ? <FiUnlock /> : <FiLock />}
            </button>
        </div>
    );
};

export default PasswordInput;