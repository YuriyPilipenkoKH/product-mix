import NextAuth from "next-auth"; // Default import
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt-ts";
import prisma from "@/lib/prisma";
import { connectMongoDB } from "@/lib/mongo";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new Error("Please provide both email and password.");
        }
        await connectMongoDB();

        // Fetch the user from the database
        const user = await prisma.user.findFirst({
          where: { email: email }, // Ensure 'email' is passed here
          select: {
            id: true, 
            name:  true, 
            email: true, 
            password: true, 
            role: true 
            },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password.");
        }

        // Verify the password
        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Password did not match.");
        }

        // Return the user object
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login", // The page where the user will be redirected after logging out
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Include role in the token
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

          if (!user.email) {
            console.error("Missing email in user data");
            return false;
          }

          // Check if the email is allowed
          if (allowedEmails.length > 0 && !allowedEmails.includes(user.email)) {
            console.error("Unauthorized email:", user.email);
            return false;
          }

          // Check if the user already exists in the database
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            // Create a new user in the database
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "Unknown",
                imageUrl: user.image || null,
                role: "user", // Default role
              },
            });
          }
        } catch (error) {
          console.error("Error while creating user:", error);
          return false;
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

