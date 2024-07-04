"use client";
import AdminLinks from "@/components/admin-links";
import PreviewPage from "@/components/preview-page";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Link {
    _id: string;
    order: number;
    title: string;
    url: string;
    thumbnail: string;
    enabled: boolean;
}

interface UserLinks {
    links: Link[];
}

export default function AdminPage() {
    const { data: session, status } = useSession();

    const [iFrameKey, setIFrameKey] = useState(0);
    const [initialDescriptionValue, setinitialDescriptionValue] = useState('');
    const [userLinks, setUserLinks] = useState<UserLinks | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const title = useRef("");
    const url = useRef("");

    const descriptionRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchUserLinks = async () => {
            try {
                const response = await axios.get(`/api/links/getnonarhived?userId=${session?.user.id}`);
                if (response) {
                    setUserLinks({ links: response.data.links });
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        }

        if (session?.user.id) {
            fetchUserLinks();
        }
    }, [session?.user.id]);

    const refreshIframe = () => {
        setIFrameKey(prevKey => prevKey + 1);
    }

    const handleDescriptionChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (initialDescriptionValue !== e.target.value) {
            refreshIframe();
            setinitialDescriptionValue(e.target.value);
            await axios.put(`/api/user/update?userId=${session?.user.id}`, { updateFields: { description: e.target.value } });
        }
    };

    const handleDescriptionKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            descriptionRef.current?.blur();
        }
    };

    const insertLink = (newLink: Link) => {
        if (userLinks) {
            setUserLinks({
                links: [...userLinks.links, newLink]
            });
        }
    };

    const createLink = async () => {
        if (title.current.length > 0 && url.current.length > 0) {
            const response = await axios.post(`/api/links/add`, { userId: session?.user.id, title: title.current, url: url.current });
            if (response.data.success) {
                insertLink(response.data.link);
                title.current = "";
                url.current = "";
            }
        }
    }

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value.startsWith("https://")) {
            setErrorMessage("The URL must start with 'https://'");
        } else {
            url.current = e.target.value;
            setErrorMessage("")
        }
    }

    if (status !== 'loading') {
        return (
            <div>
                {status === "authenticated" && session && (
                    <div className="flex flex-row w-full h-[89vh]">
                        <Sidebar active={1} />
                        <div className="w-full h-[89vh] overflow-auto scrollbar-hide">
                            <div className="flex flex-col gap-3 pt-2 px-[20px] sm:px-[50px] md:px-[70px] lg:px-[70px] xl:px-[70px] 2xl:px-[100px] 3xl:px-[200px] w-full">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Add link</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]" onBlur={() => setErrorMessage("")}>
                                        <DialogHeader>
                                            <DialogTitle>Add new link</DialogTitle>
                                            <DialogDescription>
                                                Add a new link to your page. Click add link when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="gap-4 py-4 flex flex-col items-center justify-center">
                                            <div className="grid grid-cols-4 items-center gap-1">
                                                <Label htmlFor="title" className="text-center">
                                                    Title
                                                </Label>
                                                <Input
                                                    id="title"
                                                    placeholder="GitHub"
                                                    className="col-span-3 w-[250px]"
                                                    onChange={(e) => (title.current = e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-1">
                                                <Label htmlFor="url" className="text-center">
                                                    Url
                                                </Label>
                                                <Input
                                                    id="url"
                                                    placeholder="https://github.com/Fabulosu"
                                                    className="col-span-3 w-[250px]"
                                                    onChange={handleUrlChange}
                                                    required
                                                />
                                            </div>
                                            {errorMessage && <p className="text-red-500 -mt-3 pl-12 font-semibold text-sm">{errorMessage}</p>}
                                        </div>
                                        <DialogFooter>
                                            <DialogTrigger asChild>
                                                <Button type="submit" onClick={() => createLink()}>Add link</Button>
                                            </DialogTrigger>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <div className='h-36 w-full bg-primary-foreground flex flex-col rounded-md items-center justify-center'>
                                    <p className="text-lg font-black pb-2">Enter your description</p>
                                    <Input
                                        className="w-1/2 h-16 text-md text-center font-bold"
                                        placeholder="Description..."
                                        maxLength={36}
                                        defaultValue={session.user.description}
                                        onBlur={handleDescriptionChange}
                                        ref={descriptionRef}
                                        onKeyDown={handleDescriptionKeyDown}
                                    />
                                </div>
                            </div>
                            <AdminLinks userLinks={userLinks} onOrderChange={refreshIframe} />
                        </div>
                        <Separator orientation="vertical" className="hidden py-14 h-full lg:flex" />
                        <div className="hidden w-[800px] h-full lg:flex justify-center items-center p-5">
                            <PreviewPage username={session.user.username} key={iFrameKey} />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}