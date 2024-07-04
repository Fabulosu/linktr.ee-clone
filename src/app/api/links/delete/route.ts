import { dbConnect } from "@/utils/database";
import { LinkModel } from "@/utils/models";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, res: NextResponse) {
    const url = new URL(req.url);
    const linkId = url.searchParams.get("linkId");

    console.log(linkId)

    try {
        await dbConnect();

        await LinkModel.findOneAndDelete({ _id: linkId });
        return NextResponse.json({ success: true, message: "Link successfully deleted!" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting link: ", error);
        return NextResponse.json({ success: false, message: "Error deleting link!" }, { status: 500 });
    }
}