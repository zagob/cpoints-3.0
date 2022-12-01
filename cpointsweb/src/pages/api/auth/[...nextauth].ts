import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { api } from "../../../services/axios";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 86400, // 1 day
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
        };
      }

      return token;
    },

    async session({ session, token, user }) {
      if (session && token) {
        const { data: restToken } = await api.post("auth/user", {
          access_token: token.access_token,
        });

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${restToken.token}`;

        session.accessToken = token.access_token;
        session.userApi = restToken;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
