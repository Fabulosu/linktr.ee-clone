import { FaRegTrashAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';
import { GoGrabber } from "react-icons/go";
import { Switch } from "@/components/ui/switch"
import { Separator } from './separator';
import axios from 'axios';
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import IconSelector from "./icon-selector";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
    id: string;
    title: string;
    url: string;
    handleDrag: any;
    enabled: boolean;
    thumbnail: string;
    onOrderChange: () => void;
    onDelete: (id: string) => void;
}

const EditableLink: React.FC<Props> = ({ id, title, url, enabled, thumbnail, handleDrag, onOrderChange, onDelete }) => {

    const [initialTitleValue, setInitialTitleValue] = useState('');
    const [initialUrlValue, setInitialUrlValue] = useState('');
    const titleRef = useRef<HTMLInputElement | null>(null);
    const urlRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setInitialTitleValue(title);
        setInitialUrlValue(url);
    }, [title, url]);

    const handleSwitchChange = async (boolean: boolean) => {
        onOrderChange();
        await axios.put(`/api/links/update?linkId=${id}`, { updateFields: { enabled: boolean } })
    };

    const archiveLink = async () => {
        onDelete(id);
        onOrderChange();
        await axios.put(`/api/links/update?linkId=${id}`, { updateFields: { archived: true } });
    }

    const deleteLink = async () => {
        onDelete(id);
        onOrderChange();
        await axios.delete(`/api/links/delete?linkId=${id}`);
    }

    const handleTitleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (initialTitleValue !== e.target.value) {
            onOrderChange();
            setInitialTitleValue(e.target.value);
            await axios.put(`/api/links/update?linkId=${id}`, { updateFields: { title: e.target.value } });
        }
    };

    const handleUrlChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (initialUrlValue !== e.target.value) {
            onOrderChange();
            setInitialUrlValue(e.target.value);
            await axios.put(`/api/links/update?linkId=${id}`, { updateFields: { url: e.target.value } });
        }
    };

    const handleTitleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            titleRef.current?.blur();
        }
    };

    const handleUrlKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            urlRef.current?.blur();
        }
    };

    return (
        <AlertDialog>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete or archive your link
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={archiveLink} className="bg-blue-500 hover:bg-blue-300">Archive</AlertDialogAction>
                    <AlertDialogAction onClick={deleteLink} className="bg-red-500 hover:bg-red-300">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            <div className='h-36 w-full bg-primary-foreground flex rounded-md'>
                <div className='w-12 flex items-center justify-center cursor-grab' {...handleDrag}><GoGrabber size={30} /></div>
                <Separator orientation='vertical' />
                <div className='w-[60%] sm:w-full flex flex-col gap-2 p-5'>
                    <div className='flex flex-row items-center gap-2'>
                        <input className="p-1 bg-transparent text-base md:text-xl font-bold"
                            type="text"
                            ref={titleRef}
                            defaultValue={title}
                            onBlur={handleTitleChange}
                            onKeyDown={handleTitleKeyDown}
                        />
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <input
                            className="p-1 w-[150px] md:w-[300px] rounded-sm bg-transparent text-xs md:text-base font-semibold"
                            type="text"
                            ref={urlRef}
                            defaultValue={url}
                            onBlur={handleUrlChange}
                            onKeyDown={handleUrlKeyDown}
                        />
                    </div>
                    <div className='flex flex-row gap-1'>
                        <IconSelector linkId={id} thumbnail={thumbnail} handleChange={onOrderChange} />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div
                                        className={cn(
                                            buttonVariants({ variant: "ghost" }),
                                            "lg:w-8 lg:h-8 w-8 h-8 flex justify-around lg:justify-center px-0 cursor-pointer"
                                        )}
                                    >
                                        <CiStar size={18} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Prioritize</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className='w-20 flex flex-col items-center justify-center h-full gap-10'>
                    <Switch defaultChecked={enabled} onCheckedChange={handleSwitchChange} />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                    <div
                                        className={cn(
                                            buttonVariants({ variant: "ghost" }),
                                            "lg:w-8 lg:h-8 w-full flex justify-around lg:justify-center px-0 cursor-pointer hover:text-red-500 transition-all ease-in duration-100"
                                        )}
                                    >
                                        <FaRegTrashAlt size={18} />
                                    </div>
                                </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Delete</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </AlertDialog>
    )
}

export default EditableLink;