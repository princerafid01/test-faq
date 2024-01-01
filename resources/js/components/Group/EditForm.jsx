import {
    Card,
    TextField,
    Select,
    Form,
    FormLayout,
    Layout,
} from "@shopify/polaris";
import PropTypes from "prop-types";
import useDraggableList from "../../hooks/useDraggable";

const EditGroupForm = ({ setGroup, group }) => {
    return (
        <FormLayout>
            <Card>
                <Form>
                    <FormLayout>
                        <TextField
                            label="Name"
                            name="name"
                            value={group.name ?? ""}
                            onChange={(value) =>
                                setGroup((prevVal) => ({
                                    ...prevVal,
                                    name: value,
                                }))
                            }
                            requiredIndicator
                            required
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={group.description ?? ""}
                            onChange={(value) =>
                                setGroup((prevVal) => ({
                                    ...prevVal,
                                    description: value,
                                }))
                            }
                            multiline={3}
                        />
                        <Select
                            label="Status"
                            name="status"
                            options={[
                                { label: "Active", value: "active" },
                                {
                                    label: "Inactive",
                                    value: "inactive",
                                },
                            ]}
                            value={group.status === 1 ? "active" : "inactive"}
                            onChange={(value) =>
                                setGroup((prevVal) => ({
                                    ...prevVal,
                                    status: value === "active" ? 1 : 0,
                                }))
                            }
                            requiredIndicator
                        />
                    </FormLayout>
                </Form>
            </Card>
        </FormLayout>
    );
};

EditGroupForm.propTypes = {
    setGroup: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
};

export default EditGroupForm;
