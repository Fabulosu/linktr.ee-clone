import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: Object;
            username: string;
            email: string;
            name: string;
            avatarURL: String;
        }
    }
    interface User {
        id: Object;
        username: string;
        email: string;
        name: string;
        avatarURL: String;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: Object;
        username: string;
        email: string;
        name: string;
        avatarURL: String;
    }
}