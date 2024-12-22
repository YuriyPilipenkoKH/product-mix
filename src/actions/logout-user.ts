import { signOut } from 'next-auth/react';
import { revalidatePath } from 'next/cache';

export const logoutUser = async () => {
  try {
    await signOut({ callbackUrl: '/login' }); // Перенаправление после выхода
          revalidatePath('/dashboard');
          return { 
            success: true, 
            message: "Logout successfull.", 
          }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
