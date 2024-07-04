import { FaPlus } from "react-icons/fa";
import { Button } from "./ui/button";
import { FaXTwitter } from "react-icons/fa6";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState, useTransition } from "react";

interface Link {
    _id: string;
    order: number;
    title: string;
    url: string;
    thumbnail: string;
    enabled: boolean;
}

const SocialIcons = () => {
    const [, startTransition] = useTransition();

    // Initial state for optimistic updates
    const [optimisticState, swapOptimistic] = useState<Link[]>([]);

    // useEffect(() => {
    //     if (userLinks && userLinks.links) {
    //         swapOptimistic(userLinks.links);
    //     }
    // }, [userLinks, swapOptimistic]);

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.index === destination.index) return;

        swapOptimistic(prevState => {
            const newState = [...prevState];
            const [movedLink] = newState.splice(source.index, 1);
            newState.splice(destination.index, 0, movedLink);

            // Reassign the order property
            newState.forEach((icon, index) => {
                icon.order = index + 1;
            });

            console.log("Updated optimistic state: ", newState); // Debugging log

            return newState;
        });

        startTransition(async () => {
            const updatedOrders = optimisticState.map(icon => ({
                iconId: icon._id,
                newOrder: icon.order,
            }));

            console.log("Sending updated orders to server: ", updatedOrders); // Debugging log

        });
    }
    return (
        <div className="flex flex-col w-full gap-5">
            <p className="text-xl font-black text-center">Social Icons</p>
            <Button variant="link" className="flex gap-1 font-semibold"><FaPlus /> Add social icons</Button>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={"socialIcons"}>
                    {(droppableProvided) => (
                        <ul
                            ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps}
                            className='flex flex-row gap-5'
                        >
                            {optimisticState.sort((a, b) => a.order - b.order).map((icon, index) => (
                                <Draggable
                                    key={icon._id}
                                    draggableId={icon._id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            <FaXTwitter size={30} key={icon._id} />
                                        </li>

                                    )}
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default SocialIcons;