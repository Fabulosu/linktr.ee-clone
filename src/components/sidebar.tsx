import { cn } from '@/lib/utils';
import React from 'react'
import { PiLinkBold } from 'react-icons/pi';
import { buttonVariants } from './ui/button';
import { TbCircleSquare } from "react-icons/tb";
import Image from 'next/image';

interface Props {
    active1?: boolean;
    active2?: boolean;
}

const Sidebar: React.FC<Props> = ({ active1 = false, active2 = false }) => {
    return (
        <div className='w-32 h-full ml-2 mt-2'>
            <div className='w-full h-[800px] flex flex-col gap-2 items-center bg-primary-foreground rounded-full shadow-xl shadow-accent'>
                <Image src='./logo.svg' width={30} height={30} alt='Linktr.ee logo' className='pt-5' />
                <div className='flex flex-col justify-center gap-2 items-center flex-grow -mt-20'>
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            `lg:w-16 lg:h-16 w-full flex justify-around lg:justify-center px-0 cursor-pointer ${active1 ? "bg-accent text-accent-foreground" : ""}`
                        )}
                    >
                        <PiLinkBold size={25} />
                    </div>
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            `lg:w-16 lg:h-16 w-full flex justify-around lg:justify-center px-0 cursor-pointer ${active2 ? "bg-accent text-accent-foreground" : ""}`
                        )}
                    >
                        <TbCircleSquare size={25} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;