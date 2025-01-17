import AuthForm from '@/components/forms/AuthForm'
import { LoginFormProps } from '@/data/formProps'
import { redirect } from 'next/navigation';
import React from 'react'
import { auth } from '../../../../auth';
import SignInButton from '@/components/Button/SignInButton';

const LoginPage = async () => {
  const session = await auth();
  // const session = await getSession();
  if (session) {
    redirect('/dashboard')
  }

  return (

    <div className='flex flex-col gap-5 items-center justify-center   p-6'  >
        <AuthForm 
          formProps={ LoginFormProps }/>
      {/* <div className='flex flex-col gap-5 w-[400px]'>
        <SignInButton provider='google' />
        <SignInButton provider='github' />
      </div> */}
    </div>

  )
}

export default LoginPage