"use client";
import PreviewPage from "@/components/preview-page";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react"
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeEditor from "@/components/theme-editor";
import CustomThemeEditor from "@/components/custom-theme-editor";

export default function AppearancePage() {
    const { data: session, status, update } = useSession();

    const [userAvatar, setUserAvatar] = useState("");
    const [iFrameKey, setIFrameKey] = useState(0);
    const [initialName, setInitialName] = useState("");
    const [userTheme, setUserTheme] = useState(0);

    const newAvatarURL = useRef("");
    const nameRef = useRef<HTMLInputElement | null>(null);

    const refreshIframe = () => {
        setIFrameKey(prevKey => prevKey + 1);
    }

    useEffect(() => {
        const fetchUserTheme = async () => {
            const response = await axios.get(`/api/user/get?username=${session?.user.username}`);
            if (response.data.success) setUserTheme(response.data.user.theme);
        }
        if (session?.user.id) fetchUserTheme();
    }, [session?.user.id]);

    const handleNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') nameRef.current?.blur();
    }

    if (status !== "loading" && status === "authenticated" && session) {

        const uploadImage = async () => {
            if (newAvatarURL.current.length > 0 && newAvatarURL.current !== userAvatar) {
                const response = await axios.put(`/api/user/update?userId=${session.user.id}`, { updateFields: { avatarURL: newAvatarURL.current } });
                if (response.data.success) {
                    update({ avatarURL: newAvatarURL.current });
                    setUserAvatar(newAvatarURL.current);
                    newAvatarURL.current = "";
                    refreshIframe();
                }
            }
        }

        const handleNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
            if (initialName !== e.target.value) {
                await axios.put(`/api/user/update?userId=${session?.user.id}`, { updateFields: { name: e.target.value } });
                refreshIframe();
                update({ name: e.target.value });
                setInitialName(e.target.value);
            }
        }

        const removeImage = async () => {
            const response = await axios.put(`/api/user/update?userId=${session.user.id}`, { updateFields: { avatarURL: "" } });
            if (response.data.success) {
                console.log(response.data)
                update({ avatarURL: 'none' });
                refreshIframe();
            }
        }

        useEffect(() => {
            setUserAvatar(session.user.avatarURL);
            setInitialName(session.user.name);
        }, [session.user.avatarURL, session.user.name]);

        return (
            <div className="flex flex-row w-full h-[89vh]">
                <Sidebar active={3} />
                <div className="w-full h-[89vh] overflow-auto scrollbar-hide">
                    <h1 className="font-bold text-2xl flex px-[20px] sm:px-[50px] md:px-[70px] lg:px-[70px] xl:px-[70px] 2xl:px-[100px] items-center text-left pt-5">Profile</h1>
                    <div className="flex flex-col px-[20px] sm:px-[50px] md:px-[70px] lg:px-[70px] xl:px-[70px] 2xl:px-[100px] 3xl:px-[300px] gap-6 pt-6">
                        <div className="flex flex-row gap-3">
                            <Avatar className="rounded-full w-[100px] h-[100px]" >
                                <AvatarImage src={userAvatar} alt={`${session.user.username}'s avatar`} />
                                <AvatarFallback>{session.user.username.at(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-2 w-full justify-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="rounded-full bg-blue-500 text-white hover:bg-blue-600">Pick an image</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Upload image</DialogTitle>
                                            <DialogDescription>
                                                Insert the link to your image. It must end with an image extension (ex: .png, .jpg)!
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="gap-4 py-4 flex flex-col items-center justify-center">
                                            <div className="grid grid-cols-4 items-center gap-1">
                                                <Label htmlFor="url" className="text-center">
                                                    Image URL
                                                </Label>
                                                <Input
                                                    id="url"
                                                    placeholder="https://i.imgur.com/tUMwJLJ.png"
                                                    className="col-span-3 w-[250px]"
                                                    onChange={(e) => (newAvatarURL.current = e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogTrigger asChild>
                                                <Button type="submit" onClick={() => uploadImage()}>Upload Image</Button>
                                            </DialogTrigger>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button className="rounded-full" onClick={() => removeImage()}>Remove</Button>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="displayName">Display name</Label>
                            <Input
                                id="displayName"
                                className="mt-1"
                                defaultValue={session.user.name}
                                ref={nameRef}
                                onBlur={handleNameChange}
                                onKeyDown={handleNameKeyDown}
                            />
                        </div>
                        <ThemeEditor themeId={userTheme} userId={session.user.id} refreshIFrame={refreshIframe} />
                        <CustomThemeEditor userId={session.user.id} username={session.user.username} refreshIFrame={refreshIframe} />
                    </div>
                </div>
                <Separator orientation="vertical" className="hidden py-14 h-full lg:flex" />
                <div className="hidden w-[800px] h-full lg:flex justify-center items-center p-5">
                    <PreviewPage username={session.user.username} key={iFrameKey} />
                </div>
            </div>
        )
    }
}