'use server'

import prisma from "@/lib/prisma";
import { connectMongoDB } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { compare } from 'bcrypt-ts'

export const loginUser = async(formData: FormData) => {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  if ( !email || !password) {
    throw new Error("All fields are required.");
  }
    try {
      await connectMongoDB();
    // Check if a user already exists with the same email
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (user.password) {
      const isPasswordValid = await compare(password, user.password); 
      if (!isPasswordValid) {
        return { success: false, error: "Invalid login credentials" };
      }
    }else return  { success: false, error: "Couldn't find password " }

    revalidatePath('/dashboard');
    return { success: true, user: {name: user.name, email: user.email}};

    }
     catch (error) {
      console.error('Error occurred while registering:', error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      return { success: false, error: errorMessage }
    }
}