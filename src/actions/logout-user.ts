import { signOut } from 'next-auth/react';

export const logoutUser = async () => {
  try {
    await signOut({ callbackUrl: '/login' }); // Перенаправление после выхода
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
