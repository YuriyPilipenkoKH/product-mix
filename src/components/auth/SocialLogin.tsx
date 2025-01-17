import React from 'react'
import SignInButton from '../Button/SignInButton'

const SocialLogin = () => {
  return (
      <div className='flex flex-col gap-5 p-2 w-[400px]'>
        <SignInButton provider='google' />
        <SignInButton provider='github' />
      </div> 
  )
}

export default SocialLogin