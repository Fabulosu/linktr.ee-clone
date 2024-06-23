"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import UserLink from '@/components/ui/user-link';

interface Link {
    _id: string;
    order: number;
    title: string;
    url: string;
    thumbnail: string;
}

interface UserData {
    _id: string;
    username: string;
    email: String;
    name: string;
    avatarURL: string;
    backgroundURL: string;
    links: Link[];
}

export default function UserPage({ params }: { params: { username: string } }) {
    const username = params.username;
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/user/get?username=${username}`);
                if (response) {
                    setUserData(response.data.user);

                    const getLinks = await axios.get(`/api/links/get?userId=${response.data.user._id}`);
                    if (getLinks) setUserData((prevUserData: any) => {
                        return {
                            ...prevUserData,
                            links: getLinks.data.links
                        }
                    })
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        }

        if (username) {
            fetchUserData();
        }

    }, [username]);

    if (!userData) {
        return <h1 className='flex justify-center items-center font-bold text-white h-min'>Loading...</h1>;
    }

    return (
        <div className='w-screen h-screen' style={{ backgroundImage: `url('${userData.backgroundURL}')`, backgroundSize: 'cover' }}>
            <div className="flex flex-col lg:flex-col gap-5 items-center justify-center px-5 pt-28 md:px-8 w-full lg:w-3/4 z-[20] container">
                <div>
                    <Image src={`${userData.avatarURL}`} width={128} height={128} alt={userData.username + "' logo"} priority={true} className='rounded-full' />
                </div>
                <h1 className='text-2xl font-black'>{userData.username.toUpperCase()}</h1>
                <p className='font-black text-lg'>Lorem ipsum dolor sit amet consecte</p>
                {userData.links && userData.links.length > 0 ? (
                    <div className='flex flex-col gap-5'>
                        {userData.links.sort((a, b) => a.order - b.order).map((link) => (
                            <UserLink key={link._id} icon={link.thumbnail} url={link.url} title={link.title} />
                        ))}
                    </div>
                ) : (
                    <p>No links available.</p>
                )}
            </div>
        </div >
    )
}