import { dbConnect } from "@/utils/database";
import { UserModel } from "@/utils/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");

    await dbConnect();
    const user = await UserModel.findOne({ username: { $regex: username, $options: "i" } });
    // console.log({ user })
    if (user) return NextResponse.json({ success: true, user: user });
    else return NextResponse.json({ success: false, message: "This account doesn't exist!" }, { status: 200 });
}