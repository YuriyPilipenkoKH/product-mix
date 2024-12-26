'use server'

import prisma from "@/lib/prisma";
import {hashSync} from 'bcrypt-ts'
import { connectMongoDB } from "@/lib/mongo";
import { revalidatePath } from "next/cache";

export async function registerUser (formData: FormData)  {
  const name = formData.get('name') as string | null; // Explicitly cast as string | null
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || [];

  if (!name || !email || !password) {
    throw new Error("All fields are required.");
  }

  try {
    await connectMongoDB();

    if (allowedEmails.includes(email)) {

      // Check if a user already exists with the same email
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
    
      if (existingUser) {
        return { success: false, error: "Email is already registered." };
      }
      const hashedPassword =  hashSync(password)
       // Create the user in the database

       const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "user", // Default role for new users
        },
      });

      // Exclude sensitive fields
      const { password: _, ...plainUser } = newUser;
      revalidatePath('/dashboard');
      return { 
        success: true, 
        message: "User registered and logged in successfully.", 
        user: plainUser
      };
    } else {
      return { success: false, error: "Email is not allowed" };
    }     

  }
   catch (error) {
    console.error('Error occurred while registering:', error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage }
  }

};
