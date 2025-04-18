import NextAuth, { Account, Session, User, } from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { compare } from "bcrypt-ts";
import prisma from "../prisma/prisma";
import { connectMongoDB } from "@/lib/mongo";
import { JWT } from "next-auth/jwt";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      // profile(profile) {
      //   return {
      //     id: profile.id,
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.picture,
      //     role: profile.role
      //   };
      // },
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
  }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
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
        } catch (error) {
          console.error("Error in authorize function:", error);
          throw new Error("Authorization failed. Please check your credentials.");
        }
      },
      
    }),
  ],
  pages: {
    signIn: "/login", // When the user visits a protected route without being logged in, they will be redirected to /login
    signOut: "/login", // The page where the user will be redirected after logging out
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }):Promise<Session> {
        if (session.user) {
          if (token?.id) {
            session.user.id = token.id as string;
          }
          if (token?.role) {
            session.user.role = token.role as string;
          }
        }
        return session;
    }
    ,
    async jwt({ token, user }: { token: JWT; user?: User }):Promise<JWT> {
        if (user) {
          token.id = user.id as string;
          token.role = user.role as string;
        }
        return token;
       }
    ,
    async signIn( 
      {user, account}: {
      user: User; // Use the Prisma User type here
      account: Account | null;
    }):Promise<boolean> {

        try {
        // Connect to the database
          await prisma.$connect();
          const email = user?.email ?? undefined;

          const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

          if (!email) {
            console.error("Missing email in user data");
            return false;
          }

          // Check if the email is allowed
          if (allowedEmails.length > 0 && !allowedEmails.includes(email)) {
            console.error("Unauthorized email:", email);
            return false;
          }

          // Check if the user already exists in the database
          let existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!existingUser) {
             // If user does not exist, create a new user
              existingUser = await prisma.user.create({
              data: {
              email: user.email!,
              name: user.name ?? "Anonymous",
              image: user.image ?? "",
            },
          });
          }
              // Skip account creation if the account object is missing or has no provider info
      if (!account || !account.provider || !account.providerAccountId) {
        return true; // Nothing to create; proceed
      }
      if(account.provider === 'credentials'){   
        return true; // Nothing to create; proceed
        }

       // Check if the account already exists

      const existingAccount = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
      });

      if (!existingAccount) {
        // If the account does not exist, create it
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            id_token: account.id_token,
            scope: account.scope,
            session_state: account.session_state?.toString() ?? null, // Convert to string or set to null
          },
        });
      }

          return true;
        } catch (error) {
          console.error("Error while creating user:", error);
          return false;
        }
   },
  },
  secret: process.env.AUTH_SECRET,
})

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



