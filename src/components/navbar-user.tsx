import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavbarUser = (props: any) => {
    const { data: session, status } = useSession();
    if (status !== 'loading') {

        const handleSignOut = async () => {
            await signOut();
        }
        return (
            <div className={props.className || "" + " h-full w-full"}>
                {status === 'authenticated' && session && (
                    <div className="lg:pl-2 lg:pb-0 flex justify-center items-end h-full pb-5 w-full">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="border-none outline-none w-full">
                                <div
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        "lg:w-24 w-full flex justify-around lg:justify-center px-0"
                                    )}
                                >
                                    <h2 className="text-primary font-semibold text-md">{session.user.username}</h2>
                                    <Avatar className='w-5 h-5 ml-2'>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href="/admin"><DropdownMenuItem>Admin</DropdownMenuItem></Link>
                                <Link href="/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                                <Link href="" onClick={handleSignOut}><DropdownMenuItem className='text-red-600'>Sign out</DropdownMenuItem></Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
                {status === 'unauthenticated' && (
                    <div className='flex lg:items-center lg:pb-0 flex-row h-full items-end pb-5 justify-between'>
                        <Link className="ml-2"
                            href="/login"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "secondary" }),
                                    "w-24 px-0"
                                )}
                            >
                                <p className="font-bold">Log in</p>
                            </div>
                        </Link>
                        <Link className="ml-2"
                            href="/register"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "w-24 px-0"
                                )}
                            >
                                <p className="font-bold">Sign up free</p>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        )
    }
}

export default NavbarUser;