import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { dbConnect } from "./database";
import { UserModel } from "./models";
import bcrypt from "bcrypt";

export const authConfig: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;
                await dbConnect();
                const user = await UserModel.findOne({
                    $or: [
                        { email: credentials.email },
                        { username: credentials.email }
                    ]
                })
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return { id: user._id, username: user.username, name: user.name, email: user.email, avatarURL: user.avatarURL }
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username;
                token.email = user.email;
                token.id = user.id;
                token.avatarURL = user.avatarURL;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.avatarURL = token.avatarURL;
            }
            return session;
        }
    }
}