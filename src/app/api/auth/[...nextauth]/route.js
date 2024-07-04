import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';

mongoose.connect(process.env.MONGO_URL);

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await dbConnect();
      const checkUser = await User.findOne({ id: user.id });
      if (!checkUser) {
        const response = await User.create({
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.id,
          provider: account.provider,
          image: user.image,
          projects: [],
        });
        user.name = response.id;
        user.id = response._id;
      } else {
        user.name = checkUser.id;
        user.id = checkUser._id;
      }
      return true;
    },

    async session({ session, user, token }) {
      await dbConnect();
      const dbUser = await User.findOne({ id: session.user.name });
      if (dbUser) {
        session.user.name = dbUser.id;
        session.user.id = dbUser._id;
      }
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };