"use server"
import { auth } from '@/auth';
import AuthForm from '@/components/forms/AuthForm'
import { getLoginFormProps, } from '@/data/formProps'
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
  params: { locale: string };
}

const LoginPage = async({ params }: Props) => {
  const session = await auth();
  if (session) redirect('/dashboard')

    const t = await getTranslations( 'AuthForm');
    const LoginFormProps = await getLoginFormProps(t);
    const { locale } =await params; 


  return (
    <div className='flex flex-col gap-5 items-center justify-center   p-6'  >
        <AuthForm 
          formProps={ LoginFormProps }
          locale={locale}/>
    </div>
  )
}
export default LoginPage