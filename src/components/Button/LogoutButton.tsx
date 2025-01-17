'use client'
import capitalize from "@/lib/capitalize";
import { cn } from "@/lib/utils";
import { wait } from "@/lib/wait";
import { signOut } from "next-auth/react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export interface LogoutButtonProps { 
  username: string;
}                                                   

export const LogoutButton:React.FC<LogoutButtonProps> = ({username} :LogoutButtonProps) => {
 const {pending,} = useFormStatus()

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" }); // Redirects to the login page after signing out.
      toast.success(`Logout successful, ${capitalize(username)}!`);
      await wait(2000);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
}
  return (
   
      <form action={handleLogout} >
        <button
          className={cn("btn btn-info logout-btn ", )}
          // onClick={handleLogout}  
          >
            {username}{' '}
            {pending ? 'process' : 'LogOut'}
        </button>
      </form>

  );
};