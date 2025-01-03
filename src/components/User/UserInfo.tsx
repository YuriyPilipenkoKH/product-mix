'use client'
import React, { useContext } from 'react'
import capitalize from '@/lib/capitalize';
// import { getSession } from '@/actions/get-session';
import { SessionContext, SessionContextType } from '@/context/SessionContext';





const UserInfo =() => {
  const {session} = useContext(SessionContext as React.Context<SessionContextType>);
//     const session =  await getSession()
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