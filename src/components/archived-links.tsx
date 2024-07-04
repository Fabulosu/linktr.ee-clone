"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaArchive } from "react-icons/fa";
import ArchivedLink from "./ui/archived-link";

interface Link {
    _id: string;
    order: number;
    title: string;
    url: string;
}

interface ArchivedLinks {
    links: Link[];
}

interface Props {
    updateIFrame: () => void;
}

const ArchivedLinks: React.FC<Props> = ({ updateIFrame }) => {

    const { data: session, status } = useSession();

    const [archivedLinks, setArchivedLinks] = useState<ArchivedLinks | null>(null);

    useEffect(() => {
        const fetchArcivedLinks = async () => {
            try {
                const response = await axios.get(`/api/links/getarchived?userId=${session?.user.id}`);
                if (response) setArchivedLinks({ links: response.data.links });
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        }

        if (session?.user.id) fetchArcivedLinks();
    }, [session?.user.id])

    const removeLink = (id: string) => {
        if (!archivedLinks) return;

        const updatedLinks = archivedLinks.links.filter(link => link._id !== id);
        setArchivedLinks({ links: updatedLinks });

        updateIFrame();
    }

    return (
        <div className="pt-14">
            {archivedLinks && archivedLinks.links.length > 0 ? (
                <ul className="flex flex-col px-[20px] sm:px-[50px] md:px-[70px] lg:px-[70px] xl:px-[70px] 2xl:px-[100px] 3xl:px-[300px] gap-2">
                    {archivedLinks.links.sort((a, b) => a.order - b.order).map((link, i) => (
                        <ArchivedLink id={link._id} title={link.title} url={link.url} onChange={() => removeLink(link._id)} />
                    ))}
                </ul>
            ) : (
                <div className="flex h-[50vh] sm:h-[70vh] flex-col gap-3 pt-2 px-[20px] sm:px-[50px] md:px-[70px] lg:px-[70px] xl:px-[70px] 2xl:px-[100px] 3xl:px-[300px] w-full items-center justify-center">
                    <FaArchive size={100} className="opacity-30" />
                    <p className="font-semibold text-md text-center opacity-30">Keep your link admin clean and focused by<br /> archiving links you're not currently using.</p>
                </div>
            )}
        </div>
    )
}

export default ArchivedLinks;