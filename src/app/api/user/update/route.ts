import { dbConnect } from "@/utils/database";
import { UserModel } from "@/utils/models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const { updateFields } = await req.json();

    console.log(userId);
    console.log({ updateFields })

    try {
        await dbConnect();

        await UserModel.findOneAndUpdate({ _id: userId }, { $set: updateFields });
        return NextResponse.json({ success: true, message: "User updated successfully!" }, { status: 200 });
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json({ success: false, message: "Error updating user!" }, { status: 500 });
    }
}