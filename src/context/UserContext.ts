import { User } from "@prisma/client"
import { createContext, Dispatch } from "react"

export interface UserTypes  {
  user: User
  setUser : Dispatch<User>

}

const UserContext = createContext<UserTypes | null>(null)
export default UserContext