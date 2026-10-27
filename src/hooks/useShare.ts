import { useCallback, useState } from "react";

type ShareOptions = {
    url: string;
    title?: string;
    text?: string;
};

type ShareStatus = "idle" | "copied" | "error";

export const useShare = () => {
    const [status, setStatus] = useState<ShareStatus>("idle");

    const share = useCallback(async ({
        url,
        title,
        text,
    }: ShareOptions) => {
        setStatus("idle");

        // Use the native share sheet when supported.
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({ title, text, url });
                return;
            } catch (error) {
                // User cancellation is expected, not an error.
                if (
                    error instanceof Error &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                // If native sharing fails, try copying instead.
            }
        }

        try {
            if (!navigator.clipboard?.writeText) {
                throw new Error("Clipboard API unavailable");
            }

            await navigator.clipboard.writeText(url);
            setStatus("copied");
        } catch {
            setStatus("error");
        }
    }, []);

    return { share, status };
};