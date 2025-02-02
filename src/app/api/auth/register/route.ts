import { connectMongoDB, disconnectMongoDB } from "@/lib/mongo"
import prisma from "../../../../../prisma/prisma"
import { NextResponse } from "next/server"
import {  hashSync} from "bcrypt-ts";


export const POST = async (req: Request) => {
  try {
    const {name, email, password} = await req.json()
    if(!name || !email || !password) {
      return NextResponse.json(
        {message: 'Invalid data'},
        {status: 402}
      )
    }
    const hashedPassword =  hashSync(password)
    await connectMongoDB()
    const newUser = prisma.user.create({
      data:{
          name,
          email, 
          password: hashedPassword
        }
      })
      console.log(newUser);
      

    return NextResponse.json(
      {data:{
        name,
        email, 
        password: hashedPassword
      }},
      {status: 201},
      
    )  
  } 
  catch (error) {
    return NextResponse.json(
      { message: "Server error"+ error},
      { status: 500 }
    )
    }
    finally{
      await disconnectMongoDB()
    }
}