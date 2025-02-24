import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';

interface UserData {
  id: string;
  email: string;
  name: string;
  password: string;
  apiKey: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await kv.hgetall<UserData>(`user:${credentials.email}`);
        
        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: null,
          apiKey: user.apiKey,
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.apiKey = (user as any).apiKey;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).apiKey = token.apiKey;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 