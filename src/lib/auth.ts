import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Config from '@/util/Config'

import jwt_decode from "jwt-decode"
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          username: credentials!.email,
          password: credentials!.password,
        };

        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        if (Config?.API_KEY) {
          headers['Authorization'] = Config.API_KEY;
        }

        const res = await fetch( `https://l09wpoj3oc.execute-api.us-east-1.amazonaws.com/auth`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: headers,
        });

       const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 5 * 60 * 1000,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.token = user.token
        // @ts-ignore
        token.refleshToken = user.refleshToken
      }

      return token
    },

    async session({ session, token }) {
        // @ts-ignore
      var decoded = jwt_decode(token.refleshToken);
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        // @ts-ignore
        session.user.token = token.token
        // @ts-ignore
        session.user.refleshToken = token.refleshToken
        // @ts-ignore
        session.user.decode =   decoded
      }

      return session
    }
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/logo.png', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
};