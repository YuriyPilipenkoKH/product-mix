'use server'

import prisma from "../../prisma/prisma"


export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { categories: true },
    })
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}