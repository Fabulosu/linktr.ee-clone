"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RotatingImage from "@/components/ui/main-image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Home() {

  const [name, setName] = useState<string>('');
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRedirect = () => {
    router.replace(`/register?username=${encodeURIComponent(name)}`);
  }

  return (
    <main className="flex flex-row items-center justify-center px-5 md:px-8 mt-32 md:mt-40 w-full lg:w-3/4 z-[20] container">
      <div className="h-full w-full lg:w-3/4 flex flex-col gap-5 justify-center m-auto text-start">
        <div className="flex flex-col gap-6 mt-6 text-7xl font-bold text-foreground max-w-[600px] w-auto h-auto">
          <h1>Everything you are. In one, simple link in bio.</h1>
        </div>
        <p className="text-lg text-muted-foreground my-5 max-w-[600px]">Join 40M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
        <div className="flex flex-row">
          <div className="flex items-center">
            <span className="text-default pl-[10px] pt-[1px]">linktr.ee/</span>
            <Input className="-ml-[73px] max-w-[200px] mr-3 bg-transparent pl-[73px] text-md" type="text" placeholder="yourname" value={name} onChange={handleInputChange} maxLength={10} />
          </div>
          <Button variant="default" onClick={handleRedirect}>Claim your Linktree</Button>
        </div>
      </div>
      <div className="w-full h-full md:flex justify-center items-center hidden">
        <RotatingImage src="/phonefront.png" alt="" />
      </div>
    </main>
  );
}
