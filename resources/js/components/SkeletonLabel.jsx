import { Box } from "@shopify/polaris";

const SkeletonLabel = (props) => {
    return (
        <Box
            background="bg-fill-tertiary"
            minHeight="1rem"
            maxWidth="5rem"
            borderRadius="base"
            {...props}
        />
    );
};

export default SkeletonLabel;
