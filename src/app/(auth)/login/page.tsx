// import LoginForm from '@/app/components/forms/LoginForm'
// import { getSession } from '@/lib/getSession'
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
    <div>
      <AuthForm 
        formProps={ LoginFormProps }/>
    </div>
  )
}

export default LoginPage