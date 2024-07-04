"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { themes } from '@/utils/themes';
import UserLink from '@/components/ui/user-link';
import { FaXTwitter } from 'react-icons/fa6';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Link {
    _id: string;
    order: number;
    title: string;
    url: string;
    thumbnail: string;
}

interface CustomTheme {
    bgStyle: number;
    bgColor: string;
    bgImage: string;
    buttonStyle: number;
    buttonColor: string;
    buttonHoverColor: string;
    buttonFontColor: string;
    buttonFontHoverColor: string;
    buttonFont: string;
}

interface UserData {
    _id: string;
    username: string;
    email: String;
    name: string;
    avatarURL: string;
    backgroundURL: string;
    description: string;
    theme: number;
    links: Link[];
    custom_theme: CustomTheme;
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

                    const getLinks = await axios.get(`/api/links/getenabled?userId=${response.data.user._id}`);
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
        return <h1 className='flex justify-center items-center font-bold text-white h-[98vh]'>Loading...</h1>;
    }

    const lightenColor = (hex: string, percent: number) => {
        const num = parseInt(hex.slice(1), 16);
        const r = (num >> 16) + Math.round(2.55 * percent);
        const g = (num >> 8 & 0x00FF) + Math.round(2.55 * percent);
        const b = (num & 0x0000FF) + Math.round(2.55 * percent);

        const newR = (r < 255 ? r < 1 ? 0 : r : 255).toString(16).padStart(2, '0');
        const newG = (g < 255 ? g < 1 ? 0 : g : 255).toString(16).padStart(2, '0');
        const newB = (b < 255 ? b < 1 ? 0 : b : 255).toString(16).padStart(2, '0');

        return `#${newR}${newG}${newB}`;
    }

    const getBackground = () => {
        if (userData.theme === 0) {
            switch (userData.custom_theme.bgStyle) {
                case 1:
                    return { backgroundColor: userData.custom_theme.bgColor };
                case 2:
                    return { background: `linear-gradient(to top, ${userData.custom_theme.bgColor}, ${lightenColor(userData.custom_theme.bgColor, 40)})` }
                case 3:
                    return { backgroundImage: `url('${userData.custom_theme.bgImage}')`, backgroundSize: 'cover' };
                case 4:
                    return { background: `repeating-linear-gradient(45deg, ${userData.custom_theme.bgColor}, ${userData.custom_theme.bgColor} 10px, ${lightenColor(userData.custom_theme.bgColor, 30)} 10px, ${lightenColor(userData.custom_theme.bgColor, 30)} 20px)` };
                default:
                    break;
            }
        } else {
            if (themes[userData.theme - 1].background.startsWith("#")) {
                return { backgroundColor: themes[userData.theme - 1].background };
            } else {
                return { backgroundImage: `url('${themes[userData.theme - 1].background}')`, backgroundSize: 'cover' };
            }
        }
    }

    const getThemeStyle = () => {
        if (userData.theme !== 0) {
            return themes[userData.theme - 1].style;
        } else {
            return '';
        }
    }

    return (
        <div className='w-screen h-[100vh] overflow-hidden overflow-y-auto' style={getBackground()}>
            <div className="flex flex-col lg:flex-col gap-5 items-center justify-center px-5 pt-14 md:pt-28 md:px-8 w-full lg:w-3/4 z-[20] container">
                <div>
                    <Avatar className="rounded-full w-24 h-24 md:w-32 md:h-32" >
                        <AvatarImage src={userData.avatarURL} alt={`${userData.username}'s avatar`} />
                        <AvatarFallback>{userData.name.at(0)}</AvatarFallback>
                    </Avatar>
                </div>
                <h1 className='text-2xl font-black'>{userData.name}</h1>
                <p className='font-black text-lg text-center'>{userData.description}</p>
                {userData.links && userData.links.length > 0 ? (
                    <div className='flex flex-col gap-5'>
                        {userData.links.sort((a, b) => a.order - b.order).map((link) => (
                            <UserLink
                                key={link._id}
                                icon={link.thumbnail}
                                url={link.url}
                                title={link.title}
                                themeStyle={getThemeStyle()}
                                buttonStyle={userData.custom_theme.buttonStyle}
                                buttonColor={userData.custom_theme.buttonColor}
                                buttonHoverColor={userData.custom_theme.buttonHoverColor}
                                buttonFont={userData.custom_theme.buttonFont}
                                buttonFontColor={userData.custom_theme.buttonFontColor}
                                buttonFontHoverColor={userData.custom_theme.buttonFontHoverColor}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No links available.</p>
                )}
                <div className='flex flex-row gap-6 justify-center h-[50px] w-full items-center'>
                    <FaXTwitter size={25} className='hover:cursor-pointer hover:size-9 transition-all ease-in duration-200' />
                    <FaXTwitter size={25} className='hover:cursor-pointer hover:size-9 transition-all ease-in duration-200' />
                    <FaXTwitter size={25} className='hover:cursor-pointer hover:size-9 transition-all ease-in duration-200' />
                    <FaXTwitter size={25} className='hover:cursor-pointer hover:size-9 transition-all ease-in duration-200' />
                </div>
            </div>
        </div >
    )
}