import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { FiAlignJustify } from "react-icons/fi";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import NavbarUser from './navbar-user';


const ToggleNavbar = () => {
    return (
        <div className='lg:hidden'>
            <Sheet>
                <SheetTrigger><FiAlignJustify className='h-8 w-8 mt-2' /></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>NAVBAR</SheetTitle>
                    </SheetHeader>
                    <div className='flex flex-col gap-2 pt-10 h-full'>
                        <Link
                            href="#"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "secondary" }),
                                    "w-full px-0 p-2 flex justify-center"
                                )}
                            >
                                <p className="font-bold text-xl">Templates</p>
                            </div>
                        </Link>
                        <Link
                            href="#"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "secondary" }),
                                    "w-full px-0 p-2 flex justify-center"
                                )}
                            >
                                <p className="font-bold text-xl">Discover</p>
                            </div>
                        </Link>
                        <Link
                            href="#"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "secondary" }),
                                    "w-full px-0 p-2 flex justify-center"
                                )}
                            >
                                <p className="font-bold text-xl">Pricing</p>
                            </div>
                        </Link>
                        <NavbarUser />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ToggleNavbar;