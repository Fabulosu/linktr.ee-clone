"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import ThemeSelector from "./themeselector";
import NavbarUser from "./ui/navbar-user";

const Navbar = () => {
    return (
        <nav className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex justify-around h-24 w-full lg:w-3/4 items-center">
                <div className="flex items-center space-x4 lg:space-x6">
                    <Link href="/" className="flex items-center">
                        <span className="font-bold text-xl">Linktr.ee</span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <div className="flex items-center">
                        <Link
                            href="#"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-24 px-0"
                                )}
                            >
                                <p className="font-bold">Templates</p>
                            </div>
                        </Link>
                        <Link
                            href="#"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-24 px-0"
                                )}
                            >
                                <p className="font-bold">Discover</p>
                            </div>
                        </Link>
                        <Link
                            href="#"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-24 px-0"
                                )}
                            >
                                <p className="font-bold">Pricing</p>
                            </div>
                        </Link>
                        <ThemeSelector />
                        <NavbarUser />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;