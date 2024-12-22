'use client'
import { LogInput, LoginSchema, RegInput, RegisterSchema } from '@/models/auth'
import { AuthFormBaseTypes } from "@/types/formTypes"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useForm } from 'react-hook-form'

interface AuthFormProps {
  formProps: AuthFormBaseTypes
}


const AuthForm:React.FC<AuthFormProps> = ({formProps}) => {
  const {
    formName,
    titleLabel,
    welcomeMsg,
    backButtonLabel, 
    backButtonHref, 
    showSocial
  } = formProps
  const [logError, setLogError] = useState<string>('')
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const router = useRouter()
  const {
    register, 
    handleSubmit,
    formState,
    reset,
  } = useForm<LogInput | RegInput>({
    defaultValues:
    formName === 'loginForm'
      ? { email: '', password: '' }
      : { name: '', email: '', password: '' },
          mode:'all',
          resolver: zodResolver(formName === 'loginForm' 
            ? LoginSchema 
            : RegisterSchema),
  })
  const {
      errors,
      isDirty,
      isValid ,
      isSubmitting,
      isLoading 
  } = formState
return(
  <div>
    <h2>{formName}</h2>
    <h2>{titleLabel}</h2>
  </div>
)
}
export default AuthForm