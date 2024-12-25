
import { getCookie } from "cookies-next";
import { auth, revalidateSession } from "./../../auth";
// import {cache} from 'react'

// export const getSession = cache(async () => {
//   const session = await auth();
//   return session;
// });

export const getSession = async () => {
  const token = getCookie("authToken");
  const session = await revalidateSession(token?.toString());
  return session;
};