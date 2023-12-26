import { Card, TextField, Select, Form, FormLayout } from "@shopify/polaris";
import PropTypes from "prop-types";
import useDraggableList from "../../hooks/useDraggable";

const EditGroupCard = ({ setGroup, group }) => {
    const ITEMS = [
        { id: "1", title: "Example list 1" },
        { id: "2", title: "Example list 2" },
        { id: "3", title: "Example list 3" },
        { id: "4", title: "Example list 4" },
        { id: "5", title: "Example list 5" },
    ];
    const { DraggableList } = useDraggableList(ITEMS);
    return (
        <>
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
                                { label: "Inactive", value: "inactive" },
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
            <Card>
                <DraggableList />
            </Card>
        </>
    );
};

EditGroupCard.propTypes = {
    setGroup: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
};

export default EditGroupCard;
