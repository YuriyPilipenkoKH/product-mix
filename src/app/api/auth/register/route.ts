import { connectMongoDB } from "@/lib/mongo"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export const POST = async (req: Request) => {
  try {
    const {name, email, password} = await req.json()
    if(!name || !email || !password) {
      return NextResponse.json(
        {message: 'Invalid data'},
        {status: 402}
      )
    }
    await connectMongoDB()
    const newUser = prisma.user.create({
      data:{
          name, email, password
        }
      })
  } 
  catch (error) {
    
  }
}