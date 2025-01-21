'use server'

import prisma from "../../prisma/prisma";
import { connectMongoDB } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { compare } from 'bcrypt-ts'
import { getTranslations } from "next-intl/server";

export const loginUser = async(formData: FormData) => {
  const rawFormData = Object.fromEntries(formData)
  console.log("rawFormData",rawFormData);
  const email = formData.get('email') as string | null;
  const t = await getTranslations( 'Login-user'); 
  const password = formData.get('password') as string | null;

  if ( !email || !password ) {
    throw new Error("All fields are required.");
  }
    try {
      await connectMongoDB();
    // Check if a user already exists with the same email
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      return { success: false, error: t("userNotFound") };
    }

    if (user.password) {
      const isPasswordValid = await compare(password, user.password); 
      if (!isPasswordValid) {
        return { success: false, error: t("invalidLogin") };
      }
    }else return  { success: false, error: t("missingPassword") }

    revalidatePath('/dashboard');
    return { success: true, user: {name: user.name, email: user.email}};

    }
     catch (error) {
      console.error('Error occurred while registering:', error);
      const errorMessage = error instanceof Error 
      ? error.message 
      : t("unexpectedError");
      return { success: false, error: errorMessage }
    }
}