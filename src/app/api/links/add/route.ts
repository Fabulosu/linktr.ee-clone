import { dbConnect } from "@/utils/database";
import { LinkModel } from "@/utils/models";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
    const { userId, title, url } = await req.json();

    console.log({ userId, title, url })

    try {
        await dbConnect();

        const lastLink = await LinkModel.findOne({ user: userId }).sort({ order: -1 });
        console.log(lastLink);
        const newOrder = (lastLink && lastLink.order) ? lastLink.order + 1 : 0;
        console.log(newOrder);

        const link = new LinkModel({
            user: userId,
            title: title,
            url: url,
            enabled: false,
            thumbnail: "none",
            archived: false,
            order: newOrder,
        });
        await link.save();
        return NextResponse.json({ success: true, link: link }, { status: 200 });
    } catch (error) {
        console.error("Error creating link: ", error);
        return NextResponse.json({ success: false, message: "Error creating link!" }, { status: 500 });
    }
}