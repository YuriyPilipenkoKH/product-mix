
import AuthForm from '@/components/forms/AuthForm'
import { LoginFormProps } from '@/data/formProps'
import React from 'react'

const LoginPage = async () => {
  

  return (

      <div>
        <AuthForm 
          formProps={ LoginFormProps }/>
      </div>

  )
}

export default LoginPage