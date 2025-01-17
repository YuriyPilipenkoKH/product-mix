import Link from 'next/link'
import React from 'react'
import { LogoutButton } from '../Button/Button'
import { Session } from 'next-auth'
import Logo from '../Logo'
import { imageProps } from '@/data/imageProps'
import { redirect } from 'next/navigation'
import { watchRole } from '@/actions/watch-role'

interface WebNavBarProps {
  session: Session
}

const WebNavBar:React.FC<WebNavBarProps> = async({session}) => {

  const user = session?.user
  const email = session?.user?.email;
  if (!email) redirect('/dashboard');

  const formData = new FormData();
  formData.append("email", email);

  const userRole = await watchRole(formData); // Call server action

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