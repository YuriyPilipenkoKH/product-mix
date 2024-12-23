import Link from 'next/link'
import React from 'react'

const WebNavBar = () => {
  return (
    <nav className='flex items-center justify-center p-3 w-full '>
      <Link href={''}>logo</Link>
      <Link href={'/'}>home</Link>
      <Link href={'/adminpanel'}>admin page</Link>
    </nav>
  )
}

export default WebNavBar