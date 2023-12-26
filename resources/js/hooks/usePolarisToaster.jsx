import { useState, useCallback } from "react";
import { Frame, Toast } from "@shopify/polaris";
import { navigate } from "raviger";

const useToaster = () => {
    const [active, setActive] = useState(false);
    const [content, setContent] = useState("");
    const [duration, setDuration] = useState(3000);

    const showToast = useCallback((message, miliseconds) => {
        setContent(message);
        setActive(true);
        setDuration(miliseconds);
    }, []);

    const delayRedirectTo = useCallback((path, delay = 1000) => {
        setTimeout(() => {
            navigate(path);
        }, delay);
    }, []);

    const hideToast = useCallback(() => {
        setContent("");
        setActive(false);
    }, []);

    const ToastComponent = active ? (
        <Frame>
            <Toast
                content={content}
                duration={duration}
                onDismiss={hideToast}
            />
        </Frame>
    ) : null;

    return {
        showToast,
        hideToast,
        ToastComponent,
        delayRedirectTo,
    };
};

export default useToaster;
