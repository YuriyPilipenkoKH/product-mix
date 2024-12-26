"use server";

import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";



export async function revalidateSession() {
  // Retrieve the cookies
  const cookieStore = await cookies(); 

  // Construct headers object from cookies
 // Manually build the cookie string by accessing cookies by name
 const cookieNames = ["authjs.csrf-token","authjs.session-token"]; // Replace with your actual cookie names

 
 const cookieHeader = cookieNames
 .map((cookieName) => {
   const cookieValue = cookieStore.get(cookieName);
   return cookieValue ? `${cookieName}=${cookieValue}` : null;
  })
  .filter(Boolean)
  .join("; ");
  console.log(cookieHeader);

 if (!cookieHeader) {
   return null;
 }

 // Get the token using headers
 const token = await getToken({
   req: { headers: { cookie: cookieHeader } },
   secret: process.env.AUTH_SECRET, // Explicitly pass the secret

  });

  if (!token || !token.id) {
    return null;
  }

  try {
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: token.id as string },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return null;
    }

    // Return the session
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Error fetching user in revalidateSession:", error);
    return null;
  }
}
