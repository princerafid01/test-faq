import { useEffect, useState } from "react";
import { Card, TextField, Select, Form, FormLayout } from "@shopify/polaris";
import PropTypes from 'prop-types';

const AddGroupCard = ({ setGroup }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("active");

    const handleTitleChange = (value) => {
        setTitle(value);
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    useEffect(() => {
        setGroup({title, description, status});
    },[title, description, status])


    return (
        <Card>
            <Form>
                <FormLayout>
                    <TextField
                        label="Name"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                        multiline={3}
                    />
                    <Select
                        label="Status"
                        options={[
                            { label: "Active", value: "active" },
                            { label: "Inactive", value: "inactive" },
                        ]}
                        value={status}
                        onChange={handleStatusChange}
                    />
                </FormLayout>
            </Form>
        </Card>
    );
};

AddGroupCard.propTypes = {
    setGroup: PropTypes.func.isRequired
};

export default AddGroupCard;


