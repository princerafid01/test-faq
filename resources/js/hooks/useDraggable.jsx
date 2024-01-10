import { useState, useCallback, useEffect } from "react";
import {
    ResourceItem,
    Icon,
    LegacyStack,
    Text,
    Tooltip,
    BlockStack,
    InlineStack,
} from "@shopify/polaris";
import {
    DeleteMajor,
    DragHandleMinor,
    EditMajor,
    HideMinor,
    ViewMinor,
} from "@shopify/polaris-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./hookStyle.css";
import DotsWithActionMenu from "../components/DotsWithActionMenu";
import useAxios from "./useAxios";
import useModal from "./usePolarisModal";
import useToaster from "./usePolarisToaster";
import { navigate, usePathParams } from "raviger";

const useDraggableList = (initialItems, isLoading, setIsLoading) => {
    const [items, setItems] = useState([]);
    const [idToDelete, setIdToDelete] = useState(0);

    const [dotMenuFaqId, setDotMenuFaqId] = useState("");
    const { showToast, ToastComponent } = useToaster();
    const { axios } = useAxios();
    const { groupId } = usePathParams("/group-edit/:groupId");

    const handleHide = async (id) => {
        setIsLoading(true);

        const { data: updatedFaq } = await axios
            .put("/toggle-faq", {
                faqid: id,
            })
            .catch((error) => console.log(error));

        setItems((prevItems) => {
            prevItems = prevItems.map((item) =>
                item.id === updatedFaq.id ? updatedFaq : item,
            );
            return prevItems;
        });

        setDotMenuFaqId("");
        setIsLoading(false);
    };

    useEffect(() => {
        // we're updating the draggable list based on faqs:
        setItems(initialItems);
    }, [initialItems]);

    const handleDragEnd = useCallback(({ source, destination }) => {
        setItems((oldItems) => {
            const newItems = oldItems.slice(); // Duplicate
            const [temp] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, temp);
            return newItems;
        });
    }, []);

    const handleDelete = async () => {
        openModal();
        setIsLoading(true);
        const { data } = await axios
            .delete(`/faq/${idToDelete}`)
            .catch((error) => console.log(error));
        setItems((prevVal) => prevVal.filter((val) => val.id !== idToDelete));
        closeModal();
        showToast(data?.message, 1000);
        setIsLoading(false);
    };

    const {
        openModal,
        closeModal,
        ModalComponent: DeleteModalComponent,
    } = useModal(
        "Remove 1 FAQ?",
        "This can not be undone.",
        "Delete",
        handleDelete,
    );

    const deleteAction = (id) => {
        setIdToDelete(id);
        openModal();
    };

    const ListItem = ({ id, answer, question, index, faqId, status }) => (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={
                        snapshot.isDragging
                            ? {
                                  background: "white",
                                  ...provided.draggableProps.style,
                                  opacity: status ? "1" : "0.3",
                              }
                            : {
                                  ...provided.draggableProps.style,
                                  opacity: status ? "1" : "0.3",
                              }
                    }
                >
                    <ResourceItem id={id}>
                        <div style={{ display: "flex" }}>
                            <div style={{ paddingRight: "10px" }}>
                                <BlockStack gap="400">
                                    <InlineStack blockAlign="start" gap="400">
                                        <div {...provided.dragHandleProps}>
                                            <Tooltip content="Drag to reorder Questions">
                                                <Icon
                                                    source={DragHandleMinor}
                                                    color="inkLightest"
                                                />
                                            </Tooltip>
                                        </div>
                                    </InlineStack>
                                </BlockStack>
                            </div>
                            <BlockStack
                                gap="100"
                                style={{ width: "100%", display: "block" }}
                                onClick={() => setDotMenuFaqId(faqId)}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text as="h2" variant="headingMd">
                                        {question}
                                    </Text>
                                    <DotsWithActionMenu
                                        actionMenus={[
                                            {
                                                content: status
                                                    ? "Hide"
                                                    : "Show",
                                                icon: status
                                                    ? HideMinor
                                                    : ViewMinor,
                                                onAction: () =>
                                                    handleHide(faqId),
                                            },
                                            {
                                                content: "Edit",
                                                icon: EditMajor,
                                                onAction: () =>
                                                    navigate(
                                                        `/group-edit/${groupId}/question/${faqId}`,
                                                    ),
                                            },
                                            {
                                                content: "Delete",
                                                icon: DeleteMajor,
                                                onAction: () =>
                                                    deleteAction(faqId),
                                            },
                                        ]}
                                        isActive={faqId === dotMenuFaqId}
                                    />
                                </div>

                                <div
                                    style={{
                                        textAlign: "justify",
                                        wordWrap: "normal",
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: answer,
                                    }}
                                ></div>
                            </BlockStack>
                        </div>
                    </ResourceItem>
                </div>
            )}
        </Draggable>
    );

    const DraggableList = () => (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="root">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {items.map((item, index) => (
                                <ListItem
                                    key={item.id}
                                    faqId={item.id}
                                    id={`faq${item.id}`}
                                    index={index}
                                    question={item.question}
                                    answer={item.answer}
                                    status={item.status}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div style={{ display: "none" }}>{DeleteModalComponent}</div>
            <div style={{ display: "none" }}>{ToastComponent}</div>
        </>
    );

    return { DraggableList };
};

export default useDraggableList;
