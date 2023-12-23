import { Page, Layout, FormLayout, Text } from "@shopify/polaris";
import { navigate } from "raviger";
import AddGroupCard from "../components/Group/Add";
import { useState } from "react";

const AddGroup = () => {
    const [group, setGroup] = useState({});

    return (
        <Page
            title="Add Group"
            backAction={{ onAction: () => navigate("/") }}
            primaryAction={{
                content: "Save",
                onAction: () => console.log(group),
            }}
        >
            <Layout>
                <Layout.Section>
                    <FormLayout>
                        <AddGroupCard setGroup={setGroup} />
                    </FormLayout>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default AddGroup;
