
// import { revalidateSession } from "@/actions/revalidateSession";
// import { getCookie } from "cookies-next";

import { cache } from 'react';
import { auth } from "../../auth";

export const getSession = cache(async () => {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    // You can return a default value or handle the error appropriately
    return null; // or throw error if you want the caller to handle it
  }
});


// export const getSession = async () => {
//   const token = getCookie("authjs.csrf-token");
//   const session = await revalidateSession();
//   return session;
// };