"use server"
import AuthForm from '@/components/forms/AuthForm'
import { getRegisterFormProps } from '@/data/formProps'
import { getTranslations } from 'next-intl/server';
import React from 'react'

interface Props {
  params: { locale: string };
}

const RegisterPage = async({ params }: Props) => {
  const t = await getTranslations('AuthForm');
  const RegisterFormProps = await getRegisterFormProps(t);
  return (
    <div>
      <AuthForm 
      formProps={ RegisterFormProps }/>
    </div>
  )
}

export default RegisterPage