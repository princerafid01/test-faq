import { useState, useCallback } from "react";
import {
    ResourceItem,
    Icon,
    LegacyStack,
    Thumbnail,
    Tooltip,
} from "@shopify/polaris";
import { DragHandleMinor } from "@shopify/polaris-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./hookStyle.css";

const useDraggableList = (initialItems) => {
    const [items, setItems] = useState(initialItems);

    const handleDragEnd = useCallback(({ source, destination }) => {
        setItems((oldItems) => {
            const newItems = oldItems.slice(); // Duplicate
            const [temp] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, temp);
            return newItems;
        });
    }, []);

    const ListItem = ({ id, index, title }) => (
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
                    <ResourceItem id={id} url="https://github.com/qw-in">
                        <LegacyStack alignment="center">
                            <div {...provided.dragHandleProps}>
                                <Tooltip content="Drag to reorder list items">
                                    <Icon
                                        source={DragHandleMinor}
                                        color="inkLightest"
                                    />
                                </Tooltip>
                            </div>
                            <Thumbnail
                                source={`https://picsum.photos/id/${
                                    100 + id
                                }/60/60`}
                                alt=""
                            />
                            <h1>{title}</h1>
                        </LegacyStack>
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
                                id={item.id}
                                index={index}
                                title={item.title}
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
