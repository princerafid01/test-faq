import {
    LegacyCard,
    LegacyStack,
    Button,
    Collapsible,
    Link,
    Label,
    Form,
    FormLayout,
    TextField,
    Card,
    Box,
    BlockStack,
    InlineGrid,
    Text,
    Icon,
} from "@shopify/polaris";
import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";
import Wysiwyg from "../Wysiwyg";
import "trix/dist/trix.css";
import useAxios from "../../hooks/useAxios";
import "../../../css/app.css";
import { CircleChevronDownMinor } from "@shopify/polaris-icons";

const AddFaq = ({ groupId, showToast, setFaqs }) => {
    const { axios } = useAxios();
    const [open, setOpen] = useState(false);
    const [richTextInput, setRichTextInput] = useState("");
    const [addQuestionLoader, setAddQuestionLoader] = useState(false);

    const [question, setQuestion] = useState({ question: "", answer: "" });

    const handleToggle = useCallback(() => setOpen((open) => !open), []);
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const resetAddFaqForm = () => {
        richTextInput.editor.loadHTML("");
        setAddQuestionLoader(false);
        setQuestion({ question: "", answer: "" });
        showToast("Question added.");
    };

    const addFaq = async () => {
        setAddQuestionLoader(true);
        const { data } = await axios
            .post(`/faqs/${groupId}`, {
                question: question.question,
                answer: question.answer,
                status: 1,
            })
            .catch((error) => console.log(error));
        setFaqs((prevValue) => [...prevValue, data]);
        resetAddFaqForm();
    };

    return (
        <>
            <Card>
                <BlockStack gap="200">
                    <InlineGrid columns="1fr auto">
                        <Text as="h2" variant="headingSm">
                            <Button
                                onClick={handleOpen}
                                ariaExpanded={open}
                                ariaControls="basic-collapsible"
                            >
                                Add Question
                            </Button>
                        </Text>
                        {open ? (
                            <Button
                                variant="plain"
                                onClick={handleClose}
                                accessibilityLabel="Add variant"
                            >
                                See Less
                            </Button>
                        ) : (
                            <Icon source={CircleChevronDownMinor} tone="base" />
                        )}
                    </InlineGrid>
                </BlockStack>

                <Collapsible
                    open={open}
                    id="basic-collapsible"
                    transition={{
                        duration: "500ms",
                        timingFunction: "ease-in-out",
                    }}
                    expandOnPrint
                >
                    <Box paddingBlock="400">
                        <Form onSubmit={addFaq}>
                            <FormLayout>
                                <TextField
                                    label="Question"
                                    value={question.question}
                                    onChange={(value) =>
                                        setQuestion((prevValue) => ({
                                            ...prevValue,
                                            question: value,
                                        }))
                                    }
                                    requiredIndicator
                                    required
                                />
                                <Label id="LabelRequired" for="LabelRequired">
                                    Answer
                                </Label>
                                <Wysiwyg
                                    value={question.answer}
                                    setRichTextInput={setRichTextInput}
                                    richTextInput={richTextInput}
                                    onChange={(value) =>
                                        setQuestion((prevValue) => ({
                                            ...prevValue,
                                            answer: value,
                                        }))
                                    }
                                />
                                <Button
                                    variant="primary"
                                    submit
                                    loading={addQuestionLoader}
                                >
                                    Save
                                </Button>
                            </FormLayout>
                        </Form>
                    </Box>
                </Collapsible>
            </Card>
        </>
    );
};

AddFaq.propTypes = {
    groupId: PropTypes.number.isRequired,
    showToast: PropTypes.func.isRequired,
    setFaqs: PropTypes.func.isRequired,
};

export default AddFaq;
