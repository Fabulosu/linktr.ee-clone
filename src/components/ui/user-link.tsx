import Link from 'next/link';
import React from 'react';
import { FaGithub, FaRegCompass } from 'react-icons/fa';
import { FaHandcuffs, FaXTwitter } from 'react-icons/fa6';
import { buttonStyles } from '@/utils/themes';

interface Props {
    icon: string;
    url: string;
    title: string;
    themeStyle?: string;
    buttonStyle: number;
    buttonColor: string;
    buttonHoverColor: string;
    buttonFontColor: string;
    buttonFontHoverColor: string;
    buttonFont: string;
}

const UserLink: React.FC<Props> = ({
    icon,
    url,
    title,
    themeStyle,
    buttonStyle,
    buttonColor,
    buttonHoverColor,
    buttonFontColor,
    buttonFontHoverColor,
    buttonFont,
}) => {
    const getRealIcon = (icon: string) => {
        switch (icon) {
            case 'github':
                return <FaGithub className='size-7 md:size-10' />;
            case 'compass':
                return <FaRegCompass className='size-7 md:size-10' />;
            case 'x':
            case 'twitter':
                return <FaXTwitter className='size-7 md:size-10' />;
            case 'handcuffs':
                return <FaHandcuffs className='size-7 md:size-10' />;
            default:
                return null;
        }
    };

    const getStyle = () => {
        if (themeStyle) {
            return themeStyle;
        } else {
            return `${buttonStyles[buttonStyle].style} font-${buttonFont}`;
        }
    };

    const getStyles = () => {
        if (!themeStyle) {
            return {
                backgroundColor: buttonColor,
                color: buttonFontColor,
                transition: 'background-color 0.3s ease, color 0.3s ease',
            };
        }
    };

    const hoverStyle = (style: number) => {
        if (!themeStyle) {
            if (style === 1) {
                return (buttonHoverColor)
            } else if (style === 2) {
                return (buttonFontHoverColor)
            }
        }
    };

    return (
        <Link
            href={url}
            target='_blank'
        >
            <div
                className={`${getStyle()} h-12 md:h-16 w-[270px] md:w-[600px] p-3 flex flex-row items-center justify-between cursor-pointer transition ease-linear duration-300`}
                style={getStyles()}
            >
                {getRealIcon(icon)}
                <p className='text-xl font-black w-full text-center'>{title}</p>
                {getRealIcon(icon)}
            </div>
            <style jsx>{`
                div:hover {
                background-color: ${hoverStyle(1)} !important;
                color: ${hoverStyle(2)} !important;
                }
            `}</style>

        </Link>

    );
};

export default UserLink;