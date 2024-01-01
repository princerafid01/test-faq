import { Page, Layout, FormLayout, Toast, Frame } from "@shopify/polaris";
import { navigate } from "raviger";
import { useCallback, useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import EditGroupForm from "../components/Group/EditForm";
import PropTypes from "prop-types";
import useToaster from "../hooks/usePolarisToaster";
import FaqList from "../components/Faq/List";
import AddFaq from "../components/Faq/Add";

const EditGroup = ({ id }) => {
    const [isLoading, setIsloading] = useState(false);
    const [group, setGroup] = useState({});
    const [realGroupName, setRealGroupName] = useState("");
    const { axios } = useAxios();
    const [faqs, setFaqs] = useState([]);
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
            setRealGroupName(data.name);
            showToast("Group Edited", 3000);
            // delayRedirectTo("/");
        } catch (error) {
            console.log(error);
        }

        setIsloading(false);
    }, [group]);

    const fetchGroup = async () => {
        const { data } = await axios.get(`groups/${id}`);
        setRealGroupName(data?.name);
        setGroup(data);
        fetchFaqList();
    };

    const fetchFaqList = async () => {
        const { data } = await axios.get(`/faqs/${id}`);
        setFaqs(data);
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
                    content: "Save Group",
                    accessibilityLabel: "Save Group",
                    onAction: () => updateGroup(),
                    loading: isLoading,
                    disabled: !group.name || group.status === "",
                }}
            >
                <Layout>
                    <Layout.Section>
                        <EditGroupForm group={group} setGroup={setGroup} />
                    </Layout.Section>
                    <Layout.Section>
                        {group && group.id && (
                            <AddFaq
                                groupId={group.id}
                                showToast={showToast}
                                setFaqs={setFaqs}
                            />
                        )}
                    </Layout.Section>
                    <Layout.Section>
                        {group && faqs?.length > 0 && (
                            <FaqList groupId={group.id} faqs={faqs} />
                        )}
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
