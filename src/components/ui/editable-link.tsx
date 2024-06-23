import React from 'react';
import { FaImage, FaRegTrashAlt } from "react-icons/fa";
import { PiSquaresFour, PiArrowUUpRightBold } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { TbCalendarClock } from "react-icons/tb";
import { IoLockClosedOutline } from "react-icons/io5";
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';
import { GoGrabber } from "react-icons/go";
import { MdModeEditOutline } from "react-icons/md";
import { Switch } from "@/components/ui/switch"
import { Separator } from './separator';

const EditableLink = () => {
    return (
        <div className='h-36 w-full bg-primary-foreground flex rounded-md'>
            <div className='w-12 flex items-center justify-center cursor-pointer'><GoGrabber size={30} /></div>
            <Separator orientation='vertical' />
            <div className='w-full flex flex-col gap-2 p-5'>
                <div className='flex flex-row items-center gap-2'>
                    <p className='text-xl font-bold'>Title</p>
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "lg:w-8 lg:h-8 w-full flex justify-around lg:justify-center px-0 cursor-pointer"
                        )}
                    >
                        <MdModeEditOutline />
                    </div>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <p className='text-md font-semibold'>https://github.com/Fabulosu</p>
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "lg:w-8 lg:h-8 w-full flex justify-around lg:justify-center px-0 cursor-pointer"
                        )}
                    >
                        <MdModeEditOutline />
                    </div>
                </div>
                <div className='flex flex-row gap-1'>
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "lg:w-8 lg:h-8 w-full flex justify-around lg:justify-center px-0 cursor-pointer"
                        )}
                    >
                        <PiSquaresFour size={18} />
                    </div>
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "lg:w-8 lg:h-8 w-full flex justify-around lg:justify-center px-0 cursor-pointer"
                        )}
                    >
                        <PiArrowUUpRightBold size={18} />
                    </div>
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "lg:w-8 lg:h-8 w-full flex justify-around lg:justify-center px-0 cursor-pointer"
                        )}
                    >
                        <FaImage size={18} />
                    </div>
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "lg:w-8 lg:h-8 w-full flex justify-around lg:justify-center px-0 cursor-pointer"
                        )}
                    >
                        <CiStar size={18} />
                    </div>
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "lg:w-8 lg:h-8 w-full flex justify-around lg:justify-center px-0 cursor-pointer"
                        )}
                    >
                        <TbCalendarClock size={18} />
                    </div>
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "lg:w-8 lg:h-8 w-full flex justify-around lg:justify-center px-0 cursor-pointer"
                        )}
                    >
                        <IoLockClosedOutline size={18} />
                    </div>
                </div>
            </div>
            <div className='w-20 flex flex-col items-center justify-center h-full gap-10'>
                <Switch />
                <div
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "lg:w-8 lg:h-8 w-full flex justify-around lg:justify-center px-0 cursor-pointer"
                    )}
                >
                    <FaRegTrashAlt size={18} />
                </div>
            </div>
        </div>
    )
}

export default EditableLink;