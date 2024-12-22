'use server' 
import {cookies} from 'next/headers'

export const retrieveToken = async() => {
  
  const token =  (await cookies()).get("authjs.csrf-token")?.value ?? "";
  return token
}
