import NextAuth, {CredentialsSignin} from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import Google from "next-auth/providers/google"
import {compare} from 'bcrypt-ts'

import connectMongoDb from "@/lib/mongo"
import prisma from "@/lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        // You can customize the user object returned here
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture, // Use the correct property for the image
        };
      },
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: {
          label: 'Password',
          type: 'string'
        },
      },
      authorize: async (credentials) => {

        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        await connectMongoDb();

        const user = await prisma.user.findOne({ email }).select("+password"); // Removed +role

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password); 

        if (!isMatched) {
          throw new Error("Password did not match");
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        }
      }

    })
  ],
  pages: {
    signIn: "/login",
    signOut: "/login", //  The page where the user will be redirected after logging out
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Removed token.role as we're no longer using the role field
      if (user) {
        token.id = user.id; // Set user ID in the token
      }
      return token;
    },
    async signIn({ user, account }) {
      const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || [];

      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;

        //  email checking
        if (!email) {
          console.error("Missing email in user data");
          return false; 
        }

        // checking for allowed email
        if (!allowedEmails.includes(email) || allowedEmails.length === 0) {
          console.error("Unauthorized email:", email);
          return false; 
        }

          await connectMongoDb();
          const alreadyUser = await User.findOne({ email });

          if (!alreadyUser) {
            // Create a new user without the role field
            await User.create({ email, name, image, authProviderId: id });
          }
        } catch (error) {
          console.error("Error while creating user:", error);
          // throw new Error("Error while creating user");
        }
      }
      return true; // Always return true to continue the sign-in process
    },
  },
})