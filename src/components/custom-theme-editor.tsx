import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";

interface Props {
    userId: string;
    username: string;
    refreshIFrame: () => void;
}

const CustomThemeEditor: React.FC<Props> = ({ userId, username, refreshIFrame }) => {

    const [initialColor, setInitialColor] = useState("");
    const [initialImageURL, setInitialImageURL] = useState("");
    const [initialBgType, setInitialBgType] = useState<number | null>(null);
    const [initialButtonStyle, setInitialButtonStyle] = useState<number | null>(null);
    const [initialButtonColor, setInitialButtonColor] = useState("");
    const [initialButtonHoverColor, setInitialButtonHoverColor] = useState("");
    const [initialButtonFontColor, setInitialButtonFontColor] = useState("");
    const [initialButtonFontHoverColor, setInitialButtonFontHoverColor] = useState("");

    const bgColor = useRef<HTMLInputElement | null>(null);
    const bgImage = useRef<HTMLInputElement | null>(null);
    const btnColor = useRef<HTMLInputElement | null>(null);
    const btnHoverColor = useRef<HTMLInputElement | null>(null);
    const btnFontColor = useRef<HTMLInputElement | null>(null);
    const btnFontHoverColor = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        const fetchThemeData = async () => {
            const response = await axios.get(`/api/user/get?username=${username}`);
            if (response) {
                setInitialColor(response.data.user.custom_theme.bgColor);
                setInitialImageURL(response.data.user.custom_theme.bgImage);
                setInitialBgType(response.data.user.custom_theme.bgStyle);
                setInitialButtonStyle(response.data.user.custom_theme.buttonStyle);
                setInitialButtonColor(response.data.user.custom_theme.buttonColor);
                setInitialButtonHoverColor(response.data.user.custom_theme.buttonHoverColor);
                setInitialButtonFontColor(response.data.user.custom_theme.buttonFontColor);
                setInitialButtonFontHoverColor(response.data.user.custom_theme.buttonFontHoverColor);
                console.log(response.data.user.custom_theme.buttonColor)
            }
        }

        if (username) fetchThemeData();
    }, [username]);

    const handleBgTypeChange = async (bgType: number) => {
        if (bgType !== initialBgType) {
            const response = await axios.put(`/api/user/update?userId=${userId}`, { updateFields: { "custom_theme.bgStyle": bgType } });
            if (response.data.success) {
                setInitialBgType(bgType);
                refreshIFrame();
            }
        }
    };

    const handleBgColorChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (initialColor !== e.target.value) {
            const response = await axios.put(`/api/user/update?userId=${userId}`, { updateFields: { "custom_theme.bgColor": e.target.value } });
            if (response.data.success) setInitialColor(e.target.value);
            if (initialBgType === 1 || initialBgType === 2 || initialBgType === 4) refreshIFrame();
        }
    };

    const handleBgImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (initialImageURL !== e.target.value) {
            const response = await axios.put(`/api/user/update?userId=${userId}`, { updateFields: { "custom_theme.bgImage": e.target.value } });
            if (response.data.success) setInitialImageURL(e.target.value);
            if (initialBgType === 3) refreshIFrame();
        }
    };

    const handleBgColorKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            bgColor.current?.blur();
        }
    };

    const handleBgImageKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            bgImage.current?.blur();
        }
    };

    const handleBtnColorKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            btnColor.current?.blur();
        }
    };

    const handleBtnHoverColorKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            btnHoverColor.current?.blur();
        }
    };

    const handleBtnFontColorKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            btnFontColor.current?.blur();
        }
    };

    const handleBtnFontHoverColorKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            btnFontHoverColor.current?.blur();
        }
    };

    const handleButtonColorChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (initialButtonColor !== e.target.value) {
            const response = await axios.put(`/api/user/update?userId=${userId}`, { updateFields: { "custom_theme.buttonColor": e.target.value } });
            if (response) {
                setInitialButtonColor(e.target.value);
                refreshIFrame();
            }
        }
    };

    const handleButtonHoverColorChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (initialButtonHoverColor !== e.target.value) {
            const response = await axios.put(`/api/user/update?userId=${userId}`, { updateFields: { "custom_theme.buttonHoverColor": e.target.value } });
            if (response) {
                setInitialButtonHoverColor(e.target.value);
                refreshIFrame();
            }
        }
    };

    const handleButtonFontColorChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (initialButtonFontColor !== e.target.value) {
            const response = await axios.put(`/api/user/update?userId=${userId}`, { updateFields: { "custom_theme.buttonFontColor": e.target.value } });
            if (response) {
                setInitialButtonFontColor(e.target.value);
                refreshIFrame();
            }
        }
    };

    const handleButtonFontHoverColorChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (initialButtonFontHoverColor !== e.target.value) {
            const response = await axios.put(`/api/user/update?userId=${userId}`, { updateFields: { "custom_theme.buttonFontHoverColor": e.target.value } });
            if (response) {
                setInitialButtonFontHoverColor(e.target.value);
                refreshIFrame();
            }
        }
    };

    const handleButtonStyleChange = async (style: number) => {
        if (initialButtonStyle !== style) {
            const response = await axios.put(`/api/user/update?userId=${userId}`, { updateFields: { "custom_theme.buttonStyle": style } });
            setInitialButtonStyle(style);
            if (response.data.success) {
                refreshIFrame();
            }
        }
    };


    return (
        <div className="flex flex-col gap-5 justify-center pb-5">
            <h1 className="text-2xl font-bold text-left">Custom appearance</h1>
            <p className='text-muted-foreground'>Completely customize your Linktree profile. Change your background with colors, gradients and images. Choose a button style, change the typeface and more.</p>
            <h1 className="text-2xl font-bold text-left pt-5">Backgrounds</h1>
            <div className="bg-primary-foreground rounded-lg p-5 flex flex-col transition-all">
                <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-2 sm:gap-4">
                    <div
                        className="w-[100px] h-[218px] sm:w-[136px] sm:h-[254px] cursor-pointer"
                        key="1"
                        onClick={() => handleBgTypeChange(1)}
                    >
                        <div className={`${initialBgType === 1 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} flex justify-center items-center w-[100px] h-[172px] sm:w-[136px] sm:h-[208px] transition-all`}>
                            <div className={`${initialBgType === 1 ? 'w-[74px] h-[146px] sm:w-[110px] sm:h-[182px]' : 'w-[100px] h-[172px] sm:w-[136px] sm:h-[208px]'} rounded-md transition-all bg-gray-900`} />
                        </div>
                        <p className="text-center pt-2 font-semibold text-md">Flat color</p>
                    </div>
                    <div
                        className="w-[100px] h-[218px] sm:w-[136px] sm:h-[254px] cursor-pointer"
                        key="2"
                        onClick={() => handleBgTypeChange(2)}
                    >
                        <div className={`${initialBgType === 2 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} flex justify-center items-center w-[100px] h-[172px] sm:w-[136px] sm:h-[208px] transition-all`}>
                            <div className={`${initialBgType === 2 ? 'w-[74px] h-[146px] sm:w-[110px] sm:h-[182px]' : 'w-[100px] h-[172px] sm:w-[136px] sm:h-[208px]'} rounded-md transition-all bg-gradient-to-t from-gray-900 to-gray-700`} />
                        </div>
                        <p className="text-center pt-2 font-semibold text-md">Gradient</p>
                    </div>
                    <div
                        className="w-[100px] h-[218px] sm:w-[136px] sm:h-[254px] cursor-pointer"
                        key="3"
                        onClick={() => handleBgTypeChange(3)}
                    >
                        <div className={`${initialBgType === 3 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} flex justify-center items-center w-[100px] h-[172px] sm:w-[136px] sm:h-[208px] transition-all`}>
                            <div className={`${initialBgType === 3 ? 'w-[74px] h-[146px] sm:w-[110px] sm:h-[182px]' : 'w-[100px] h-[172px] sm:w-[136px] sm:h-[208px]'} rounded-md transition-all`} style={{ backgroundImage: `url('/gif.gif')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                        </div>
                        <p className="text-center pt-2 font-semibold text-md">Image/GIF</p>
                    </div>
                    <div
                        className="w-[100px] h-[218px] sm:w-[136px] sm:h-[254px] cursor-pointer"
                        key="4"
                        onClick={() => handleBgTypeChange(4)}
                    >
                        <div className={`${initialBgType === 4 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} flex justify-center items-center w-[100px] h-[172px] sm:w-[136px] sm:h-[208px] transition-all`}>
                            <div className={`${initialBgType === 4 ? 'w-[74px] h-[146px] sm:w-[110px] sm:h-[182px]' : 'w-[100px] h-[172px] sm:w-[136px] sm:h-[208px]'} rounded-md transition-all`} style={{ background: 'repeating-linear-gradient(45deg, #111827, #111827 10px, #374151 10px, #374151 20px)' }} />
                        </div>
                        <p className="text-center pt-2 font-semibold text-md">Stripes</p>
                    </div>
                </div>
                <div>
                    {(initialBgType === 1 || initialBgType === 2 || initialBgType === 4) && (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="color" className="text-left">Color</Label>
                            <Input
                                id="color"
                                type="text"
                                placeholder="#000000"
                                defaultValue={initialColor || "#000000"}
                                ref={bgColor}
                                onBlur={handleBgColorChange}
                                onKeyDown={handleBgColorKeyDown}
                            />
                        </div>
                    )}
                    {initialBgType === 3 && (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="imageURL" className="text-left">Image URL</Label>
                            <Input
                                id="imageURL"
                                type="text"
                                placeholder="https://i.imgur.com/tUMwJLJ.png"
                                defaultValue={initialImageURL}
                                ref={bgImage}
                                onBlur={handleBgImageChange}
                                onKeyDown={handleBgImageKeyDown}
                            />
                        </div>
                    )}
                </div>
            </div>
            <h1 className="text-2xl font-bold text-left pt-5">Buttons</h1>
            <div className="flex flex-col w-full gap-10 sm:gap-5 bg-primary-foreground rounded-lg p-5">
                <div className="flex flex-col gap-2">
                    <p className="text-md font-semibold text-primary">Fill</p>
                    <div className="inline-grid w-full grid-cols-2 gap-3 md:grid-cols-3 h-12">
                        <div
                            className={`${initialButtonStyle === 0 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(0)}
                        >
                            <div className={`${initialButtonStyle === 0 ? `h-6 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} bg-primary transition-all`}></div>
                        </div>
                        <div
                            className={`${initialButtonStyle === 1 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(1)}
                        >
                            <div className={`${initialButtonStyle === 1 ? `h-6 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} bg-primary rounded-lg transition-all`}></div>
                        </div>
                        <div
                            className={`${initialButtonStyle === 2 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(2)}
                        >
                            <div className={`${initialButtonStyle === 2 ? `h-6 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} bg-primary transition-all rounded-full`}></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-md font-semibold text-primary">Outline</p>
                    <div className="inline-grid w-full grid-cols-2 gap-3 md:grid-cols-3">
                        <div
                            className={`${initialButtonStyle === 3 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(3)}
                        >
                            <div className={`${initialButtonStyle === 3 ? `h-6 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} border-2 border-black transition-all`}></div>
                        </div>
                        <div
                            className={`${initialButtonStyle === 4 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(4)}
                        >
                            <div className={`${initialButtonStyle === 4 ? `h-6 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} border-2 border-black rounded-lg transition-all`}></div>
                        </div>
                        <div
                            className={`${initialButtonStyle === 5 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(5)}
                        >
                            <div className={`${initialButtonStyle === 5 ? `h-6 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} border-2 border-black rounded-full transition-all`}></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-md font-semibold text-primary">Soft shadow</p>
                    <div className="inline-grid w-full grid-cols-2 gap-3 md:grid-cols-3">
                        <div
                            className={`${initialButtonStyle === 6 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(6)}
                        >
                            <div className={`${initialButtonStyle === 6 ? `h-4 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} shadow-[0_4px_4px_0_rgb(0,0,0,1)] transition-all`}></div>
                        </div>
                        <div
                            className={`${initialButtonStyle === 7 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(7)}
                        >
                            <div className={`${initialButtonStyle === 7 ? `h-4 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} shadow-[0_4px_4px_0_rgb(0,0,0,1)] rounded-lg transition-all`}></div>
                        </div>
                        <div
                            className={`${initialButtonStyle === 8 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} p-1 sm:p-0 cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(8)}
                        >
                            <div className={`${initialButtonStyle === 8 ? `h-4 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} shadow-[0_4px_4px_0_rgb(0,0,0,1)] rounded-full transition-all`}></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-md font-semibold text-primary">Hard shadow</p>
                    <div className="inline-grid w-full grid-cols-2 gap-3 md:grid-cols-3">
                        <div
                            className={`${initialButtonStyle === 9 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(9)}
                        >
                            <div className={`${initialButtonStyle === 9 ? `h-4 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} border border-black shadow-[4px_4px_0_0_black] transition-all`}></div>
                        </div>
                        <div
                            className={`${initialButtonStyle === 10 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(10)}
                        >
                            <div className={`${initialButtonStyle === 10 ? `h-4 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} border border-black shadow-[4px_4px_0_0_black] rounded-lg transition-all`}></div>
                        </div>
                        <div
                            className={`${initialButtonStyle === 11 ? 'border-2 border-muted-foreground rounded-md' : 'border-none'} p-1 sm:p-0 cursor-pointer flex items-center justify-center transition-all`}
                            onClick={() => handleButtonStyleChange(11)}
                        >
                            <div className={`${initialButtonStyle === 11 ? `h-4 w-[90%] sm:h-8` : `h-8 w-full sm:h-12`} border border-black shadow-[4px_4px_0_0_black] rounded-full transition-all`}></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="btnColor" className="text-left">Button Color</Label>
                    <Input
                        id="btnColor"
                        type="text"
                        placeholder="#000000"
                        defaultValue={initialButtonColor}
                        ref={btnColor}
                        onBlur={handleButtonColorChange}
                        onKeyDown={handleBtnColorKeyDown}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="btnHoverColor" className="text-left">Button Hover Color</Label>
                    <Input
                        id="btnHoverColor"
                        type="text"
                        placeholder="#000000"
                        defaultValue={initialButtonHoverColor}
                        ref={btnHoverColor}
                        onBlur={handleButtonHoverColorChange}
                        onKeyDown={handleBtnHoverColorKeyDown}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="btnFontColor" className="text-left">Button Font Color</Label>
                    <Input
                        id="btnFontColor"
                        type="text"
                        placeholder="#000000"
                        defaultValue={initialButtonFontColor}
                        ref={btnFontColor}
                        onBlur={handleButtonFontColorChange}
                        onKeyDown={handleBtnFontColorKeyDown}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="btnFontHoverColor" className="text-left">Button Font Hover Color</Label>
                    <Input
                        id="btnFontHoverColor"
                        type="text"
                        placeholder="#000000"
                        defaultValue={initialButtonFontHoverColor}
                        ref={btnFontHoverColor}
                        onBlur={handleButtonFontHoverColorChange}
                        onKeyDown={handleBtnFontHoverColorKeyDown}
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomThemeEditor;