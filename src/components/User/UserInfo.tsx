
import React from 'react'
import capitalize from '@/lib/capitalize';
import { auth } from '../../auth';


const UserInfo = async() => {
const session = await auth();
// console.log(session)
const user = session?.user
  return (
    <div>
      <p>Logged in as {capitalize(user?.name) || "Anonymous"}</p>
      <p>With email {user?.email}</p>
      <p>With role {user?.role}</p>
    </div>
  )
}

export default UserInfo