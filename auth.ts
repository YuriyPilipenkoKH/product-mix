import NextAuth, { Account, Session, User, } from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { compare } from "bcrypt-ts";
import prisma from "@/lib/prisma";
import { connectMongoDB } from "@/lib/mongo";
import { JWT } from "next-auth/jwt";
import { getCookie, deleteCookie } from "cookies-next";

// Helper function for token revalidation
export async function revalidateSession(token: string | undefined) {
  if (!token) {
    return null;
  }
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const result = await response.json();
    if (result?.valid) {
      return result.session;
    }
    deleteCookie("authToken"); // Clear invalid tokens
  } catch (error) {
    console.error("Error revalidating session:", error);
  }
  return null;
}


export const { handlers, signIn, signOut, auth } = NextAuth({
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
          role: "user", // Default role for Google users
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
            // createdAt: true,
            // updatedAt: true, // Include these fields
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
          password: user.password, // Include password
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // When the user visits a protected route without being logged in, they will be redirected to /login
    signOut: "/login", // The page where the user will be redirected after logging out
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        if (token?.id) {
          session.user.id = token.id as string;
        }
        if (token?.role) {
          session.user.role = token.role as string;
        }
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      return token;
    },
    async signIn({
      user,
      account,
    }: {
      user: User; // Use the Prisma User type here
      account: Account | null;
    }){
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
            console.error("user not found");
            return false;

          }
        } catch (error) {
          console.error("Error while creating user:", error);
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
})

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



