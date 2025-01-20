import { auth } from '@/auth';
import AuthForm from '@/components/forms/AuthForm'
import { LoginFormProps } from '@/data/formProps'
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
  params: { locale: string };
}

const LoginPage = async({ params }: Props) => {
  const session = await auth();
  if (session) redirect('/dashboard')
    const { locale } =await params; 
  console.log('locale login', locale);
  
  return (
    <div className='flex flex-col gap-5 items-center justify-center   p-6'  >
        <AuthForm 
          formProps={ LoginFormProps }/>
    </div>
  )
}
export default LoginPage