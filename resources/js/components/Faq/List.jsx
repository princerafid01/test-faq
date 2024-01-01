import { Card, Text, Box } from "@shopify/polaris";
import PropTypes from "prop-types";
import useDraggableList from "../../hooks/useDraggable";
import { useEffect, useState } from "react";

const FaqList = ({ groupId, faqs }) => {
    const { DraggableList } = useDraggableList(faqs);

    return (
        <>
            {faqs.length > 0 && (
                <Card>
                    <Text as="h2" variant="headingMd">
                        Questions
                    </Text>
                    <Box paddingBlock="400">
                        <DraggableList />
                    </Box>
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
