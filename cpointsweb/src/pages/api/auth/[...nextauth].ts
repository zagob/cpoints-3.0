import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { api } from "../../../services/axios";

async function refreshAccessToken(token: { refreshToken: string }) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id:
          "1013069862668-ma0t1cvbr648a208mo1reunncev49t3o.apps.googleusercontent.com",
        client_secret: "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",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    console.log("refreshedTokens", refreshedTokens);

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.access_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log("err", error);
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.PUBLIC_NEXT_CLIENT_ID!,
      clientSecret: process.env.PUBLIC_NEXT_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.PUBLIC_NEXT_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          refreshToken: account.refresh_token,
        };
      }

      return token;
    },

    async session({ session, token, user }) {
      if (session && token) {
        console.log("t", token);
        // const { data: restToken } = await api.post("/users", {
        //   access_token: token.token,
        // });

        // console.log(restToken);

        // api.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${restToken.token}`;

        session.accessToken = token.access_token;
        // session.refreshToken = token.
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
