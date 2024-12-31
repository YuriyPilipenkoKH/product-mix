
import { Session } from 'next-auth'
import React from 'react'

interface HeaderProps {
  session: Session
}

const Header:React.FC<HeaderProps > = ({session}) => {
  const user = session?.user

  return (
    <div>Header</div>
  )
}

export default Header