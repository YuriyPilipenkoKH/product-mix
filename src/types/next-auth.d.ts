// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string; // Add the role property
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string; // Include role in the session user object
    };
  }

  interface JWT {
    id: string;
    role: string; // Include role in the JWT token
  }
}
