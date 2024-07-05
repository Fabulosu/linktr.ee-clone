import { cn } from "@/lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdUnarchive } from "react-icons/md";
import { buttonVariants } from "./button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";

interface Props {
    id: string;
    title: string;
    url: string;
    onChange: () => void;
}

const ArchivedLink: React.FC<Props> = ({ id, title, url, onChange }) => {

    const handleRestore = async () => {
        const response = await axios.put(`/api/links/update?linkId=${id}`, { updateFields: { archived: false } });
        if (response.data.success) onChange();
    }

    const handleDelete = async () => {
        const response = await axios.delete(`/api/links/delete?linkId=${id}`);
        if (response.data.success) onChange();
    }

    return (
        <li className="h-36 w-full bg-primary-foreground flex rounded-md">
            <div className="w-full flex flex-col justify-center p-5">
                <div className="flex flex-row items-center gap-2">
                    <p className="p-1 text-base sm:text-xl font-bold">{title}</p>
                </div>
                <div className="flex flex-row items-center gap-2 w-[160px] sm:w-[300px]">
                    <p className="p-1 text-xs sm:text-base overflow-hidden font-semibold">{url}</p>
                </div>
            </div>
            <div className='w-20 flex flex-row items-end p-2 justify-center h-full gap-2'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "lg:w-8 lg:h-8 w-4 h-4 flex justify-around lg:justify-center px-0 cursor-pointer hover:text-blue-500 transition-all ease-in duration-100"
                                )}
                                onClick={handleRestore}
                            >
                                <MdUnarchive size={18} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Restore</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "lg:w-8 lg:h-8 w-4 h-4 flex justify-around lg:justify-center px-0 cursor-pointer hover:text-red-500 transition-all ease-in duration-100"
                                )}
                                onClick={handleDelete}
                            >
                                <FaRegTrashAlt size={18} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Delete</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </li>
    )
}

export default ArchivedLink;