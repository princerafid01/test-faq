import {
    IndexTable,
    LegacyCard,
    useIndexResourceState,
    Text,
    Badge,
    useBreakpoints,
    Button,
    ButtonGroup,
} from "@shopify/polaris";
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import { navigate } from "raviger";
import useToaster from "../../hooks/usePolarisToaster";
import useModal from "../../hooks/usePolarisModal";

const GroupList = () => {
    const [groups, setGroups] = useState([]);
    const { showToast, ToastComponent } = useToaster();
    const [idToDelete, setIdToDelete] = useState(0);
    const { axios } = useAxios();

    const resourceName = {
        singular: "group",
        plural: "groups",
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(groups);

    const truncatedText = (text) => {
        if (text?.length) {
            const words = text.split(" ");
            return words.length > 10
                ? words.slice(0, 10).join(" ") + "..."
                : text;
        } else {
            return "";
        }
    };

    const handleDelete = async () => {
        const { data } = await axios.delete(`/groups/${idToDelete}`);
        setGroups((prevVal) => prevVal.filter((val) => val.id !== idToDelete));
        closeModal();
        showToast(data?.message, 3000);
    };
    const {
        openModal,
        closeModal,
        ModalComponent: DeleteModalComponent,
    } = useModal(
        "Remove 1 Group?",
        "This can not be undone.",
        "Delete",
        handleDelete,
    );

    const deleteAction = (id) => {
        setIdToDelete(id);
        openModal();
    };

    const rowMarkup = groups?.map(
        ({ name, description, status, id }, index) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {name}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{truncatedText(description)}</IndexTable.Cell>
                <IndexTable.Cell>
                    {status === 1 ? (
                        <Badge tone="success">Active</Badge>
                    ) : (
                        <Badge tone="critical">Inactive</Badge>
                    )}
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <ButtonGroup>
                        <Button
                            icon={EditMajor}
                            onClick={() => navigate(`/group-edit/${id}`)}
                        >
                            Edit
                        </Button>
                        <Button
                            icon={DeleteMajor}
                            onClick={() => deleteAction(id)}
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    const fetchGroup = async () => {
        const { data: groups } = await axios.get("/groups");
        setGroups(groups);
    };

    useEffect(() => {
        fetchGroup();
    }, []);

    return (
        <>
            <LegacyCard>
                <IndexTable
                    condensed={useBreakpoints().smDown}
                    resourceName={resourceName}
                    itemCount={groups.length}
                    selectedItemsCount={
                        allResourcesSelected ? "All" : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        { title: "Name" },
                        { title: "Description" },
                        { title: "Status" },
                        { title: "Action", alignment: "middle" },
                    ]}
                >
                    {groups?.length > 0 && rowMarkup}
                </IndexTable>
            </LegacyCard>
            <div style={{ display: "none" }}>{ToastComponent}</div>
            <div style={{ display: "none" }}>{DeleteModalComponent}</div>
        </>
    );
};

export default GroupList;
