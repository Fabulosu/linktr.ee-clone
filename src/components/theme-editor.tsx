"use client";
import { themes } from "@/utils/themes";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
    themeId: number;
    userId: string;
    refreshIFrame: () => void;
}

const ThemeEditor: React.FC<Props> = ({ themeId, userId, refreshIFrame }) => {

    const [initialTheme, setInitialTheme] = useState<number | null>(null);
    const [usedTheme, setUsedTheme] = useState<number | null>(null);

    useEffect(() => {
        setInitialTheme(themeId);
        setUsedTheme(themeId);
    }, [themeId]);

    const handleClick = async (id: number) => {
        if (id !== initialTheme) {
            const response = await axios.put(`/api/user/update?userId=${userId}`, { updateFields: { theme: id } });
            if (response) {
                setUsedTheme(id);
                setInitialTheme(id);
                refreshIFrame();
            }
        }
    };

    return (
        <div className="flex flex-col gap-5 justify-center">
            <h1 className="text-2xl font-bold text-left">Themes</h1>
            <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-2 sm:gap-4 bg-secondary rounded-lg p-5">
                <div
                    className="w-[100px] h-[218px] sm:w-[136px] sm:h-[254px] cursor-pointer"
                    key="0"
                    onClick={() => handleClick(0)}
                >
                    <div className={`${usedTheme === 0 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} flex justify-center items-center w-[100px] h-[172px] sm:w-[136px] sm:h-[208px] transition-all`}>
                        <div className={`${usedTheme === 0 ? 'w-[74px] h-[146px] sm:w-[110px] sm:h-[182px]' : 'w-[100px] h-[172px] sm:w-[136px] sm:h-[208px]'} border-dashed border border-primary rounded-md transition-all`}>
                            <div className="flex justify-center items-center w-full h-full">
                                <h4 className={`${usedTheme === 0 ? 'text-sm' : 'text-base'} text-primary text-center font-bold transition-all`}>
                                    CREATE YOUR OWN
                                </h4>
                            </div>
                        </div>
                    </div>
                    <p className="text-center pt-2 font-semibold text-md">Custom</p>
                </div>
                {themes.map((theme) => (
                    <div
                        className="w-[100px] h-[218px] sm:w-[136px] sm:h-[254px] cursor-pointer"
                        key={theme.id}
                        onClick={() => handleClick(theme.id)}
                    >
                        <div className={`${usedTheme === theme.id ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} flex justify-center items-center w-[100px] h-[172px] sm:w-[136px] sm:h-[208px] transition-all`}>
                            <div className={`${usedTheme === theme.id ? 'w-[74px] h-[146px] sm:w-[110px] sm:h-[182px]' : 'w-[100px] h-[172px] sm:w-[136px] sm:h-[208px]'} rounded-md transition-all`}>
                                <div className="flex justify-center items-center rounded-md w-full h-full transition-all" style={{ backgroundImage: `url('/themes/${theme.id}.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                            </div>
                        </div>
                        <p className="text-center pt-2 font-semibold text-md">{theme.name}</p>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default ThemeEditor;