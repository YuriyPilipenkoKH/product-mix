// next-auth.d.ts
import { User } from "@prisma/client";

declare module "next-auth" {

  interface Session {
    user: {
      user: User; // Ensure the session user type includes all necessary fields
    };
  }

  interface JWT {
    id: string;
    role: string; // Include role in the JWT token
  }
}
