'use client';
import { LogOutIcon } from "../icons";
import { LogoutButtonProps } from "./LogoutButton";
import { useFormStatus } from "react-dom";
import capitalize from "@/lib/capitalize";
import toast from "react-hot-toast";
import { wait } from "@/lib/wait";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";


export const LogoutButton:React.FC<LogoutButtonProps> = ({username} :LogoutButtonProps) => {
  const {pending,} = useFormStatus()
  const t = useTranslations('Logout');

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" }); // Redirects to the login page after signing out.
      toast.success(`${t('success')} ${capitalize(username)}!`);
      await wait(2000);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(t("fail"));
    }
  }
  return (

    <form action={handleLogout} >
      <button
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:text-yellow-400"
        // onClick={async () => {
        //   await logoutUser();
        // }}
      >
        <LogOutIcon className="h-4 w-4" />
        {pending ? 'process' : t('exit')}
        {' '}
        {username}
      </button>
    </form>
  );
}