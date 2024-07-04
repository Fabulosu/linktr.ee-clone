import { dbConnect } from "@/utils/database";
import { LinkModel } from "@/utils/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    await dbConnect();
    const links = await LinkModel.find({ user: userId, archived: true });
    console.log({ links })
    if (links) return NextResponse.json({ success: true, links: links });
    else return NextResponse.json({ success: false, message: "This account doesn't exist!" }, { status: 200 });
}