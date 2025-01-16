import Link from 'next/link'
import React from 'react'
import { LogoutButton } from '../Button/Button'
import { Session } from 'next-auth'
import Logo from '../Logo'
import { imageProps } from '@/data/imageProps'

interface WebNavBarProps {
  session: Session
}

const WebNavBar:React.FC<WebNavBarProps> = ({session}) => {

  const user = session?.user
  const userRole = user?.role;

  return (
    <nav className='flex items-center justify-between gap-3 p-3 w-full '>
      <Logo src={imageProps.websiteLogo}  />
      <Link href={'/dashboard'}>dashboard</Link>
      {userRole === 'admin' && (
        <Link href={'/admin'}>admin page</Link>
      )}
      <LogoutButton username={user.name}/>
    </nav>
  )
}

export default WebNavBar