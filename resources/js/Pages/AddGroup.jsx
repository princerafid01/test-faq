import { Page, Layout, FormLayout, Toast, Frame } from "@shopify/polaris";
import { navigate } from "raviger";
import AddGroupCard from "../components/Group/Add";
import { useCallback, useState } from "react";
import useAxios from "../hooks/useAxios";
import useToaster from "../hooks/usePolarisToaster";

const AddGroup = () => {
    const [isLoading, setIsloading] = useState(false);
    const [group, setGroup] = useState({});
    const { axios } = useAxios();
    const { showToast, ToastComponent, delayRedirectTo } = useToaster();

    const createGroup = useCallback(async () => {
        setIsloading(true);
        try {
            const { data } = await axios.post("/groups", group);
            showToast("Group Added", 3000);
            delayRedirectTo("/");
        } catch (error) {
            console.log(error);
        }

        setIsloading(false);
    }, [group]);

    return (
        <>
            <Page
                title="Add Group"
                backAction={{ onAction: () => navigate("/") }}
                primaryAction={{
                    content: "Save",
                    accessibilityLabel: "Save",
                    onAction: () => createGroup(),
                    loading: isLoading,
                    disabled: !group.name || !group.status,
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
            {ToastComponent}
        </>
    );
};

export default AddGroup;
