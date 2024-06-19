import { Next_Auth } from "@/app/lib/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth(Next_Auth);

export { handler as GET, handler as POST };
