import { cn } from '@/lib/utils';
import React from 'react'
import { PiLinkBold } from 'react-icons/pi';
import { buttonVariants } from './ui/button';
import { TbCircleSquare } from "react-icons/tb";
import Image from 'next/image';
import { FaArchive } from 'react-icons/fa';
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
    active?: number;
}

const Sidebar: React.FC<Props> = ({ active = 1 }) => {
    return (
        <div className='h-full md:h-full ml-2 mt-0 md:mt-2 flex items-center'>
            <div className='w-12 h-[400px] md:w-16 md:h-[600px] lg:h-[800px] flex flex-col gap-2 items-center bg-primary-foreground rounded-full shadow-xl shadow-accent'>
                <Image src='/logo.svg' width={30} height={30} alt='Linktr.ee logo' className='pt-5' />
                <div className='flex flex-col justify-center gap-2 items-center flex-grow -mt-20'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        `lg:w-16 lg:h-16 w-12 h-12 flex justify-around lg:justify-center px-0 cursor-pointer ${active == 1 ? "bg-accent text-accent-foreground" : ""}`
                                    )}
                                    href="/admin"
                                >
                                    <PiLinkBold size={25} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Links</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        `lg:w-16 lg:h-16 w-12 h-12 flex justify-around lg:justify-center px-0 cursor-pointer ${active == 2 ? "bg-accent text-accent-foreground" : ""}`
                                    )}
                                    href="/admin/archive"
                                >
                                    <FaArchive size={25} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Archive</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        `lg:w-16 lg:h-16 w-12 h-12 flex justify-around lg:justify-center px-0 cursor-pointer ${active == 3 ? "bg-accent text-accent-foreground" : ""}`
                                    )}
                                    href="/admin/appearance"
                                >
                                    <TbCircleSquare size={25} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Appearance</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;