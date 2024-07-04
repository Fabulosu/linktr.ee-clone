"use client";
import ArchivedLinks from "@/components/archived-links";
import PreviewPage from "@/components/preview-page";
import Sidebar from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ArchivePage() {
    const { data: session, status } = useSession();

    const [iFrameKey, setIFrameKey] = useState(0);

    const refreshIframe = () => {
        setIFrameKey(prevKey => prevKey + 1);
    }

    if (status !== 'loading') {
        return (
            <div>
                {status === "authenticated" && session && (
                    <div className="flex flex-row w-full h-[89vh]">
                        <Sidebar active={2} />
                        <div className="w-full h-[89vh] overflow-auto scrollbar-hide">
                            <h1 className="font-bold text-2xl flex justify-center items-center text-center pt-5">Archive</h1>
                            <ArchivedLinks updateIFrame={refreshIframe} />
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