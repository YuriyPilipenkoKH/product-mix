
import { Session } from 'next-auth'
import React from 'react'
import { LogoutButton } from './Button/Button'
import Link from 'next/link'
import { getSession } from '@/actions/get-session'



const Header = async() => {
    const session = await getSession()
  const user = session?.user

  return (
    <div className='Header flex items-center justify-end px-4'>
      {session ? (
      <LogoutButton />
      ) : (
        <button className='btn'>
          <Link href='/login'>Login</Link>
        </button>
      )}
    </div>
  )
}

export default Header