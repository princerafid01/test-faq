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
} from "@shopify/polaris-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./hookStyle.css";
import DotsWithActionMenu from "../components/DotsWithActionMenu";

const useDraggableList = (initialItems) => {
    const [items, setItems] = useState([]);
    const [dotMenuFaqId, setDotMenuFaqId] = useState("");
    const [actionMenus, setActionMenus] = useState([
        {
            content: "Hide",
            icon: HideMinor,
            onAction: () => console.log("Clicked"),
        },
        {
            content: "Edit",
            icon: EditMajor,
            onAction: () => console.log("Clicked"),
        },
        {
            content: "Delete",
            icon: DeleteMajor,
            onAction: () => console.log("Clicked"),
        },
    ]);

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

    const ListItem = ({ id, answer, question, index, faqId }) => (
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
                              }
                            : provided.draggableProps.style
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
                                        actionMenus={actionMenus}
                                        isActive={faqId === dotMenuFaqId}
                                    />
                                </div>

                                <div
                                    style={{ textAlign: "justify" }}
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
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="root">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
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
    );

    return { DraggableList };
};

export default useDraggableList;
