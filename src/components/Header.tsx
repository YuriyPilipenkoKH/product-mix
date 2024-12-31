
import { Session } from 'next-auth'
import React from 'react'
import { LogoutButton } from './Button/Button'
import Link from 'next/link'

interface HeaderProps {
  session: Session
}

const Header:React.FC<HeaderProps > = ({session}) => {
  const user = session?.user

  return (
    <div className='flex items-center justify-end px-4'>
      {session ? (
      <LogoutButton />
      ) : (
      <Link href='/login'>Login</Link>
      )}
    </div>
  )
}

export default Header