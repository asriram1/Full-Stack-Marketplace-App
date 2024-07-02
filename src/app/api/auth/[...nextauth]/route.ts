import NextAuth from "next-auth";
// import { authOptions } from "@/app/_libs/authOptions";

import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  secret: process.env.MY_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
