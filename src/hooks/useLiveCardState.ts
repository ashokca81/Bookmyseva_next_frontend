import { useState, useEffect } from "react";

export const useLiveCardState = () => {
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Basic persistence could be added here if needed, consistent with hook name
        const stored = localStorage.getItem("liveCardDismissed");
        if (stored) {
            setIsDismissed(JSON.parse(stored));
        }
    }, []);

    const setDismissed = (value: boolean) => {
        setIsDismissed(value);
        localStorage.setItem("liveCardDismissed", JSON.stringify(value));
    };

    return [isDismissed, setDismissed] as const;
};
