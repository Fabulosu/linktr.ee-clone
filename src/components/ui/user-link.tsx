import Link from 'next/link';
import React from 'react';
import { FaGithub, FaRegCompass } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


interface Props {
    icon: string;
    url: string;
    title: string;
}

const UserLink: React.FC<Props> = ({ icon, url, title }) => {
    const getRealIcon = (icon: string) => {
        switch (icon) {
            case 'github':
                return <FaGithub size={40} />
            case 'compass':
                return <FaRegCompass size={40} />
            case 'x':
            case 'twitter':
                return <FaXTwitter size={40} />
            default:
                break;
        }
    }
    return (
        <Link href={url} target='_blank'>
            <div className='h-16 w-[600px] p-3 border-2 border-primary rounded-full flex flex-row items-center justify-between cursor-pointer hover:text-secondary hover:bg-primary transition ease-linear duration-300'>
                {getRealIcon(icon)}
                <p className='text-xl font-black'>{title}</p>
                {getRealIcon(icon)}
            </div>
        </Link>
    )
}

export default UserLink;