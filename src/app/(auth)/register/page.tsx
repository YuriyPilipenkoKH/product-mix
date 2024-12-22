// import RegisterForm from '@/app/components/forms/RegisterForm'
import AuthForm from '@/components/forms/AuthForm'
import { RegisterFormProps } from '@/data/formProps'
import React from 'react'

const RegisterPage = () => {
  return (
    <div>
      <AuthForm 
      formProps={ RegisterFormProps }/>
    </div>
  )
}

export default RegisterPage