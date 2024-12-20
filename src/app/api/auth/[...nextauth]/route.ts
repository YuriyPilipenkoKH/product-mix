import NextAuth, { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "@/app/auth.config"
import { PrismaClient , User as PrismaUser } from '@prisma/client'
import { z } from "zod"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { categories: true },
    })
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export const authOptions: NextAuthOptions = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (!parsedCredentials.success) return null;
      
        const { email, password } = parsedCredentials.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
      
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
          // Remove sensitive fields like `password` before returning
          const { password: _, ...safeUser } = user;
          return safeUser; // Matches Prisma's User type
        }
      
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: user.id,
        name: PrismaUser.name,
        email: PrismaUser.email,
        role: PrismaUser.role, // Manually ensure this matches Prisma's schema
      };
      return session;
    },
  }
  ,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Export the auth function
export const auth = () => getServerSession(authOptions)

