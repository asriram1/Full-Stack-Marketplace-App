import { authOptions } from "@/app/_libs/authOptions";
import NextAuth from "next-auth";

// import { authOptions } from "@/app/_libs/authOptions";

// type Props = {
//   secret: string | undefined;
//   providers: OAuthConfig<GoogleProfile>[];
// };

// import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
// import { OAuthConfig } from "next-auth/providers/oauth";
// export const authOptions: Props = {
//   secret: process.env.MY_SECRET as string,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
