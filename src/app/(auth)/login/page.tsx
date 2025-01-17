import AuthForm from '@/components/forms/AuthForm'
import { LoginFormProps } from '@/data/formProps'
import { redirect } from 'next/navigation';
import React from 'react'
import { auth } from '../../../../auth';


const LoginPage = async () => {
  const session = await auth();
  if (session) redirect('/dashboard')

  return (
    <div className='flex flex-col gap-5 items-center justify-center   p-6'  >
        <AuthForm 
          formProps={ LoginFormProps }/>
    </div>
  )
}
export default LoginPage