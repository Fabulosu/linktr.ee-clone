import { dbConnect } from "@/utils/database";
import { LinkModel } from "@/utils/models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const linkId = url.searchParams.get("linkId");
    const { updateFields } = await req.json();

    console.log({ updateFields })
    console.log(linkId)

    try {
        await dbConnect();

        await LinkModel.findOneAndUpdate({ _id: linkId }, { $set: updateFields });

        return NextResponse.json({ success: true, message: "Link updated successfully!" }, { status: 200 });
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json({ success: false, message: "Error updating link!" }, { status: 500 });
    }
}