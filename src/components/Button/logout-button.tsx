'use client';

import { logoutUser } from "@/actions/logout-user";
import { LogOutIcon } from "../icons";


export default function LogoutButton() {
  return (
    <button
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:text-gray-900"
      onClick={async () => {
        await logoutUser();
      }}
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </button>
  );
}