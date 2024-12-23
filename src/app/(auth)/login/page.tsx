
import AuthForm from '@/components/forms/AuthForm'
import { LoginFormProps } from '@/data/formProps'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'
import React from 'react'

const LoginPage = async () => {
  const session = await getSession() 
  if (session) {
    redirect('/dashboard')
  }
  return (
    <>
    {!session && (
      <div>
        <AuthForm 
          formProps={ LoginFormProps }/>
      </div>
    )}
    </>
  )
}

export default LoginPage