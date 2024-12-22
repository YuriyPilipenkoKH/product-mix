import capitalize from '@/lib/capitalize'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'

import React from 'react'

const DashboardPage = async () => {
  const session = await getSession()
  const user = session?.user
  const userName= user?.name
  const userEmail= user?.email
  if (!session) {
    redirect('/login')
  }
  return (
    <div className='grid gap-1' >
      <p>Logged in as  {userName && capitalize(userName)  || 'User'}</p>
      <p>with email {userEmail}</p>
    </div>
  )
}

export default DashboardPage