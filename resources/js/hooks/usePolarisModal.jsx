import React, { useState, useCallback } from "react";
import { Frame, Modal } from "@shopify/polaris";

const useModal = (
    title,
    content,
    primaryButtonText,
    modalHandlerOnAffirmative,
    secondaryButtonText = "Close",
) => {
    const [active, setActive] = useState(false);

    const openModal = useCallback(() => setActive(true), []);
    const closeModal = useCallback(() => setActive(false), []);

    const ModalComponent = (
        <Frame>
            <Modal
                open={active}
                onClose={closeModal}
                title={title}
                primaryAction={{
                    content: primaryButtonText,
                    onAction: modalHandlerOnAffirmative,
                }}
                secondaryActions={[
                    {
                        content: secondaryButtonText,
                        onAction: closeModal,
                    },
                ]}
            >
                <Modal.Section>
                    <p>{content}</p>
                </Modal.Section>
            </Modal>
        </Frame>
    );

    return {
        openModal,
        closeModal,
        ModalComponent,
    };
};

export default useModal;
