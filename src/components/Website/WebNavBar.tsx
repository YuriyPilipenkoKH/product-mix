import Link from 'next/link'
import React from 'react'
import { LogoutButton } from '../Button/Button'
import { Session } from 'next-auth'
import Logo from '../Logo'

interface WebNavBarProps {
  session: Session
}

const WebNavBar:React.FC<WebNavBarProps> = ({session}) => {

  const user = session?.user
  const userRole = user?.role;

  return (
    <nav className='flex items-center justify-between gap-3 p-3 w-full '>
      <Logo src='https://res.cloudinary.com/dwdkw1a4j/image/upload/v1720469699/productslist/logo/racvswvmivsj7kx8z2ta.png'  />
      <Link href={'/'}>home</Link>
      <Link href={'/dashboard'}>dashboard</Link>
      {userRole === 'admin' && (
        <Link href={'/adminpanel'}>admin page</Link>
      )}
      <LogoutButton />
    </nav>
  )
}

export default WebNavBar