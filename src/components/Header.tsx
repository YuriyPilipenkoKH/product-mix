
import React from 'react'
import { LogoutButton } from './Button/Button'
import Link from 'next/link'
import { auth } from '../auth'



const Header = async() => {
  const session = await auth();
  const username = session?.user?.name || "Dude"

  return (
    <div className='Header flex items-center justify-end px-4'>
      {session ? (
      <LogoutButton username={username}/>
      ) : (
        <button className='btn login-btn'>
          <Link href='/login'>Login</Link>
        </button>
      )}
    </div>
  )
}

export default Header