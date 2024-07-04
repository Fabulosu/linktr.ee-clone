"use client"

import * as React from "react"
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FaCompass, FaGithub, FaImage } from "react-icons/fa";
import { FaHandcuffs, FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const icons = [
    {
        value: "twitter",
        label: <FaXTwitter />,
        text: "Twitter",
    },
    {
        value: "x",
        label: <FaXTwitter />,
        text: "X",
    },
    {
        value: "github",
        label: <FaGithub />,
        text: "GitHub",
    },
    {
        value: "compass",
        label: <FaCompass />,
        text: "Compass",
    },
    {
        value: "handcuffs",
        label: <FaHandcuffs />,
        text: "Handcuffs",
    },
]

interface Props {
    linkId: string;
    thumbnail: string;
    handleChange: () => void;
}

const IconSelector: React.FC<Props> = ({ linkId, thumbnail, handleChange }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    React.useEffect(() => {
        setValue(thumbnail);
    }, [thumbnail]);

    const handleIconSelect = async (newVal: string) => {
        await axios.put(`/api/links/update?linkId=${linkId}`, { updateFields: { thumbnail: newVal } })
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                role="combobox"
                                aria-expanded={open}
                                className="lg:w-8 lg:h-8 w-8 h-8 flex justify-around lg:justify-center px-0 cursor-pointer"
                            >
                                <FaImage size={18} />
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Thumbnail</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search icon..." />
                    <CommandList>
                        <CommandEmpty>No icon found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                key=""
                                value="none"
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                    handleIconSelect(currentValue);
                                    handleChange();
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === "none" ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                <div className="flex flex-row gap-2 items-center">
                                    No thumbnail
                                </div>
                            </CommandItem>
                            {icons.sort((a, b) => {
                                if (a.text < b.text) {
                                    return -1;
                                }
                                if (a.text > b.text) {
                                    return 1;
                                }
                                return 0;
                            }).map((icon) => (
                                <CommandItem
                                    key={icon.value}
                                    value={icon.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                        handleIconSelect(currentValue);
                                        handleChange();
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === icon.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex flex-row gap-2 items-center">
                                        {icon.label}
                                        {icon.text}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default IconSelector;