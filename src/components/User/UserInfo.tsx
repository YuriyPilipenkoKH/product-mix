// 'use client'
import React from 'react'
import capitalize from '@/lib/capitalize';
import { getSession } from '@/actions/get-session';



const UserInfo =async() => {
    const session =  await getSession()
const user = session?.user
  return (
    <div>
      <p>Logged in as {capitalize(user?.name) || "User"}</p>
      <p>With email {user?.email}</p>
      <p>With role {user?.role}</p>
    </div>
  )
}

export default UserInfo