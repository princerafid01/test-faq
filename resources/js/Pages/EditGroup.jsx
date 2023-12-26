import { Page, Layout, FormLayout, Toast, Frame } from "@shopify/polaris";
import { navigate } from "raviger";
import { useCallback, useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import EditGroupCard from "../components/Group/Edit";
import PropTypes from "prop-types";
import useToaster from "../hooks/usePolarisToaster";

const EditGroup = ({ id }) => {
    const [isLoading, setIsloading] = useState(false);
    const [group, setGroup] = useState({});
    const [realGroupName, setRealGroupName] = useState("");
    const { axios } = useAxios();
    const { showToast, ToastComponent, delayRedirectTo } = useToaster();

    const updateGroup = useCallback(async () => {
        setIsloading(true);
        try {
            const { data } = await axios.post(`/groups`, {
                groupId: id,
                name: group.name,
                description: group.description,
                status: group.status,
            });
            setGroup(data);
            showToast("Group Edited", 3000);
            delayRedirectTo("/");
        } catch (error) {
            console.log(error);
        }

        setIsloading(false);
    }, [group]);

    const fetchGroup = async () => {
        const { data } = await axios.get(`groups/${id}`);
        setRealGroupName(data?.name);
        setGroup(data);
    };

    useEffect(() => {
        fetchGroup();
    }, []);

    return (
        <>
            <Page
                title={realGroupName}
                backAction={{ onAction: () => navigate("/") }}
                primaryAction={{
                    content: "Save",
                    accessibilityLabel: "Save",
                    onAction: () => updateGroup(),
                    loading: isLoading,
                    disabled:
                        !group.name ||
                        group.status === undefined ||
                        group.status === null ||
                        group.status === "",
                }}
            >
                <Layout>
                    <Layout.Section>
                        <FormLayout>
                            <EditGroupCard group={group} setGroup={setGroup} />
                        </FormLayout>
                    </Layout.Section>
                </Layout>
            </Page>
            {ToastComponent}
        </>
    );
};

EditGroup.propTypes = {
    id: PropTypes.string.isRequired,
};

export default EditGroup;
