import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER, 
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  /*
  id: '109059042651431514195',
  name: 'bhavy ramani',
  email: 'bhavyramani29@gmail.com',
  image:
   */
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await dbConnect();
      const userExists = await User.findOne({ email: user.email, provider: account.provider });
      if (userExists)
        return true;
      console.log("Here", account.provider);
      try {
        const response = await User.create({
          name: user.name,
          email: user.email,
          username: user.email.split('@')[0],
          provider: account.provider,
          image: user.image
        });
        console.log("This", response);
        if (response)
          return true;
        else
          return false;
      } catch (e) {
        console.log("error:", e);
      }
    }

  }
})

export { authoptions as GET, authoptions as POST }