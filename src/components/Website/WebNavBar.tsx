import Link from 'next/link'
import React from 'react'
import { LogoutButton } from '../Button/Button'
import { Session } from 'next-auth'

interface WebNavBarProps {
  session: Session
}

const WebNavBar:React.FC<WebNavBarProps> = ({session}) => {

  const user = session?.user
  const userRole = user?.role;

  return (
    <nav className='flex items-center justify-between gap-3 p-3 w-full '>
      <Link href={''}>logo</Link>
      <Link href={'/'}>home</Link>
      {userRole === 'admin' && (
        <Link href={'/adminpanel'}>admin page</Link>
      )}
      <LogoutButton />
    </nav>
  )
}

export default WebNavBar