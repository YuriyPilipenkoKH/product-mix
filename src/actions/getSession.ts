
// import { revalidateSession } from "@/actions/revalidateSession";
// import { getCookie } from "cookies-next";

import {cache} from 'react'
import { auth } from "../../auth";

export const getSession = cache(async () => {
  const session = await auth();
  return session;
});

// export const getSession = async () => {
//   const token = getCookie("authjs.csrf-token");
//   const session = await revalidateSession();
//   return session;
// };