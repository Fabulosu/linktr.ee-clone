import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './button';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const NavbarUser = () => {
    const { data: session, status } = useSession();
    if (status !== 'loading') {

        const handleSignOut = async () => {
            await signOut();
        }
        return (
            <div>
                {status === 'authenticated' && session && (
                    <div className="pl-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="border-none outline-none">
                                <div
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        "w-24 px-0"
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
                                <DropdownMenuItem>Admin</DropdownMenuItem>
                                <Link href=""><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                                <Link href="" onClick={handleSignOut}><DropdownMenuItem className='text-red-600'>Sign out</DropdownMenuItem></Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
                {status === 'unauthenticated' && (
                    <div>
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