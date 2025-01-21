'use server'

import prisma from "../../prisma/prisma";
import {hashSync} from 'bcrypt-ts'
import { connectMongoDB } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

export async function registerUser (formData: FormData)  {
  const name = formData.get('name') as string | null; // Explicitly cast as string | null
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  const t = await getTranslations( 'Register-user'); 
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || [];

  if (!name || !email || !password) {
    throw new Error(t("requiredFields"));
  }

  try {
    await connectMongoDB();

    if (allowedEmails.includes(email)) {

      // Check if a user already exists with the same email
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
    
      if (existingUser) {
        return { success: false, error: t('emailAlreadyRegistered') };
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
        message: t("userRegistered"), 
        user: plainUser
      };
    } else {
      return { success: false, error: t("emailNotAllowed") };
    }     

  }
   catch (error) {
    console.error('Error occurred while registering:', error);
    const errorMessage = error instanceof Error 
    ? error.message 
    : t("AunexpectedErrord");
    return { success: false, error: errorMessage }
  }

};
