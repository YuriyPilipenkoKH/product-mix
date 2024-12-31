import React from 'react'

import capitalize from '@/lib/capitalize';
import { redirect } from 'next/navigation';


const UserInfo = async () => {

      if (!session) {
        redirect('/login'); 
      }
    const { user } = session;
  return (
    <div>
      <p>Logged in as {capitalize(user?.name) || "User"}</p>
      <p>With email {user?.email}</p>
      <p>With role {user?.role}</p>
    </div>
  )
}

export default UserInfo