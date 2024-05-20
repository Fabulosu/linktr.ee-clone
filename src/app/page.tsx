"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

export default function Home() {

  const [name, setName] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 0) {
      setName("")
    } else {
      setName(e.target.value);
    }
  };

  return (
    <main className="flex flex-row items-center justify-center px-5 md:px-20 mt-32 md:mt-40 w-full lg:w-3/4 z-[20]">
      <div className="container h-full w-full lg:w-3/4 flex flex-col gap-5 justify-center m-auto text-start">
        <div className="flex flex-col gap-6 mt-6 text-7xl font-bold text-foreground max-w-[600px] w-auto h-auto">
          <h1>Everything you are. In one, simple link in bio.</h1>
        </div>
        <p className="text-lg text-muted-foreground my-5 max-w-[600px]">Join 40M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
        <div className="flex flex-row">
          <Input className="max-w-[200px] mr-3" placeholder="linktr.ee/yourname" value={`linktr.ee/${name.replace('linktr.ee/', "")}`} onChange={handleInputChange} />
          <Button variant="default">Claim your Linktree</Button>
        </div>
      </div>
    </main>
  );
}
