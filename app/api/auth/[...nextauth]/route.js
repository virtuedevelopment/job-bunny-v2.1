import NextAuth from "next-auth";
import { authOptions } from "@/_data/auth";

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}