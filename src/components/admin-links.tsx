import { useEffect, useState, useTransition } from 'react';
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import axios from 'axios';
import EditableLink from './ui/editable-link';

interface Props {
    userLinks: any;
    onOrderChange: () => void;
}

interface Link {
    _id: string;
    order: number;
    title: string;
    url: string;
    thumbnail: string;
    enabled: boolean;
}

const AdminLinks: React.FC<Props> = ({ userLinks, onOrderChange }) => {
    const [, startTransition] = useTransition();
    const [keyValue, setKeyValue] = useState(0);

    // Initial state for optimistic updates
    const [optimisticState, swapOptimistic] = useState<Link[]>([]);

    useEffect(() => {
        if (userLinks && userLinks.links) {
            swapOptimistic(userLinks.links);
        }
    }, [userLinks, swapOptimistic]);

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.index === destination.index) return;

        swapOptimistic(prevState => {
            const newState = [...prevState];
            const [movedLink] = newState.splice(source.index, 1);
            newState.splice(destination.index, 0, movedLink);

            // Reassign the order property
            newState.forEach((link, index) => {
                link.order = index + 1;
            });

            console.log("Updated optimistic state: ", newState); // Debugging log

            return newState;
        });

        startTransition(async () => {
            const updatedOrders = optimisticState.map(link => ({
                linkId: link._id,
                newOrder: link.order,
            }));

            setKeyValue(keyValue + 1);
            onOrderChange();
            console.log("Sending updated orders to server: ", updatedOrders); // Debugging log

            await axios.put(`/api/links/order`, { links: updatedOrders });
        });
    }

    const deleteLink = (id: string) => {
        swapOptimistic(prevState => prevState.filter(link => link._id !== id));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"userLinks"}>
                {(droppableProvided) => (
                    <ul
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                        className='flex flex-col gap-3 pt-2 px-[20px] sm:px-[50px] md:px-[70px] lg:px-[70px] xl:px-[70px] 2xl:px-[100px] 3xl:px-[200px] h-auto w-full'
                    >
                        {optimisticState.sort((a, b) => a.order - b.order).map((link, index) => (
                            <Draggable
                                key={link._id}
                                draggableId={link._id}
                                index={index}
                            >
                                {(provided) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <EditableLink key={link._id} id={link._id} title={link.title} url={link.url} enabled={link.enabled} thumbnail={link.thumbnail} handleDrag={provided.dragHandleProps} onOrderChange={onOrderChange} onDelete={() => deleteLink(link._id)} />
                                    </li>

                                )}
                            </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default AdminLinks;