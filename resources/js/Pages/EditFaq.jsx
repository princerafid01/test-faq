import {
    Page,
    Layout,
    FormLayout,
    Toast,
    Frame,
    Form,
    TextField,
} from "@shopify/polaris";
import { navigate } from "raviger";
import { useCallback, useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import EditGroupForm from "../components/Group/EditForm";
import PropTypes from "prop-types";
import useToaster from "../hooks/usePolarisToaster";
import FaqList from "../components/Faq/List";
import AddFaq from "../components/Faq/Add";
import Wysiwyg from "../components/Wysiwyg";

const EditFaq = ({ id, faqid }) => {
    const [isLoading, setIsloading] = useState(false);
    const { axios } = useAxios();
    const [faq, setFaq] = useState([]);
    const { showToast, ToastComponent, delayRedirectTo } = useToaster();
    const [richTextInput, setRichTextInput] = useState("");

    const updateFaq = useCallback(async () => {
        setIsloading(true);
        try {
            const { data } = await axios.post(`/faqs/${id}`, {
                faqId: faqid,
                question: faq.question,
                answer: faq.answer,
            });
            setFaq(data);
            showToast("Faq Edited", 3000);
            // delayRedirectTo("/");
        } catch (error) {
            console.log(error);
        }

        setIsloading(false);
    }, [faq]);

    const fetchFaq = async () => {
        const { data } = await axios.get(`/faq/${faqid}`);
        setFaq(data);
    };

    useEffect(() => {
        fetchFaq();
    }, []);

    useEffect(() => {
        if (richTextInput.editor) {
            richTextInput.editor.loadHTML(faq.answer);
        }
    }, [richTextInput.editor]);

    return (
        <>
            <Page
                title="Edit FAQ"
                backAction={{ onAction: () => navigate(`/group-edit/${id}`) }}
                primaryAction={{
                    content: "Save Faq",
                    accessibilityLabel: "Save Faq",
                    onAction: () => updateFaq(),
                    loading: isLoading,
                    disabled: !faq.question || faq.answer === "",
                }}
            >
                <Layout>
                    <Layout.Section>
                        {faq && faq.id && (
                            <Form>
                                <FormLayout>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={faq.question ?? ""}
                                        onChange={(value) =>
                                            setFaq((prevVal) => ({
                                                ...prevVal,
                                                question: value,
                                            }))
                                        }
                                        requiredIndicator
                                        required
                                    />
                                    <Wysiwyg
                                        value={faq.answer}
                                        setRichTextInput={setRichTextInput}
                                        richTextInput={richTextInput}
                                        onChange={(value) =>
                                            setFaq((prevValue) => ({
                                                ...prevValue,
                                                answer: value,
                                            }))
                                        }
                                    />
                                </FormLayout>
                            </Form>
                        )}
                    </Layout.Section>
                </Layout>
            </Page>
            <div style={{ display: "none" }}>{ToastComponent}</div>
        </>
    );
};

EditFaq.propTypes = {
    id: PropTypes.string.isRequired,
    faqid: PropTypes.string.isRequired,
};

export default EditFaq;
