import { dbConnect } from "@/utils/database";
import { LinkModel } from "@/utils/models";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
    const { userId, title, url, thumbnail } = await req.json();

    await dbConnect();

    const link = new LinkModel({
        user: userId,
        title: title,
        url: url,
        enabled: true,
        thumbnail: thumbnail,
        archived: false,
    });
    await link.save();
    return NextResponse.json({ link });
}