'use server'

import { auth} from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import { z } from "zod"

const actionSchema = z.object({
  action: z.string(),
})

export async function performRoleBasedAction(formData: FormData) {
  const session = await auth()
  
  if (!session || !session.user) {
    return { error: "Not authenticated" }
  }

  const parsedData = actionSchema.safeParse({
    action: formData.get('action'),
  })

  if (!parsedData.success) {
    return { error: "Invalid input" }
  }

  const { action } = parsedData.data

  switch (session.user.role) {
    case 'admin':
      if (action === 'deleteUser') {
        // Perform admin-specific action
        try {
          await prisma.user.delete({
            where: { email: 'user@example.com' }, // Replace with actual user email
          })
          return { message: "Admin action: User deleted" }
        } catch (error) {
          console.error('Failed to delete user:', error)
          return { error: "Failed to delete user" }
        }
      }
      break
    case 'manager':
      if (action === 'approveRequest') {
        // Perform manager-specific action
        // For this example, we'll just return a success message
        return { message: "Manager action: Request approved" }
      }
      break
    case 'user':
      if (action === 'submitRequest') {
        // Perform user-specific action
        // For this example, we'll just return a success message
        return { message: "User action: Request submitted" }
      }
      break
    default:
      return { error: "Unauthorized" }
  }

  return { error: "Action not allowed for this role" }
}

