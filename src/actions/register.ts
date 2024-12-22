'use server'

import prisma from "@/lib/prisma";
import {hashSync} from 'bcrypt-ts'
import { signIn } from "../../auth";

export async function register (formData: FormData)  {
  const name = formData.get('name') as string | null; // Explicitly cast as string | null
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  // Optional: Throw error or handle null values
  if (!name || !email || !password) {
    throw new Error("All fields are required.");
  }

  try {
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
      // Automatically log the user in after registration
      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false, // Set to false to handle the result manually
      });
  
      if (signInResponse?.error) {
        return { success: false, error: signInResponse.error };
      }
    return { 
      success: true, 
      message: "User registered and logged in successfully.", 
      newUser 
    };
  }
   catch (error) {
    console.error('Error occurred while registering:', error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage }
  }


};
