import { dbConnect } from "@/utils/database";
import { UserModel } from "@/utils/models";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
const { v4: uuidv4 } = require('uuid');

export async function POST(req: Request, res: NextResponse) {
    const { username, email, password } = await req.json();

    await dbConnect();
    const user = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = new UserModel({
            username: username,
            email: email,
            name: username,
            password: hashedPass,
            activated: 0,
            theme: 0,
            custom_theme: {
                bgStyle: 1,
                bgColor: "#000",
                bgImage: "none",
                buttonStyle: 0,
                buttonColor: "#fff",
                buttonHoverColor: "#333",
                buttonFontColor: "#000",
                buttonFontHoverColor: "#fff",
                buttonFont: "sans",
            },
            icons_position: 0,
            uuid: uuidv4(),
        });
        await newUser.save();
        return NextResponse.json({ success: true, message: "Account created successfully!" }, { status: 200 });
    } else {
        return NextResponse.json({ success: false, message: "There is already an account with this username or email!" }, { status: 200 });
    }
}