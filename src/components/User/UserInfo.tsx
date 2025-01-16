'use client'
import React, { useContext } from 'react'
import capitalize from '@/lib/capitalize';

import { SessionContext, SessionContextType } from '@/context/SessionContext';





const UserInfo =() => {
  const {session} = useContext(SessionContext as React.Context<SessionContextType>);

// console.log(session)
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