import { Card, Text, Box, Spinner } from "@shopify/polaris";
import PropTypes from "prop-types";
import useDraggableList from "../../hooks/useDraggable";
import { useEffect, useState } from "react";

const FaqList = ({ groupId, faqs }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { DraggableList } = useDraggableList(faqs, isLoading, setIsLoading);

    return (
        <>
            {faqs.length > 0 && (
                <Card>
                    {isLoading ? (
                        <div style={{ textAlign: "center" }}>
                            <Spinner
                                accessibilityLabel="Spinner example"
                                size="large"
                            />
                        </div>
                    ) : (
                        <>
                            <Text as="h2" variant="headingMd">
                                Questions
                            </Text>
                            <Box paddingBlock="400">
                                <DraggableList setIsLoading={setIsLoading} />
                            </Box>
                        </>
                    )}
                </Card>
            )}
        </>
    );
};

FaqList.propTypes = {
    groupId: PropTypes.number.isRequired,
    faqs: PropTypes.array.isRequired,
};

export default FaqList;
