'use client'
import { LogInput, LoginSchema, RegInput, RegisterSchema } from '@/models/auth'
import { AuthFormBaseTypes } from "@/types/formTypes"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useForm } from 'react-hook-form'
import { registerUser } from '@/actions/register-user'
import { loginUser } from '@/actions/login-user'
import toast from 'react-hot-toast'
import capitalize from '@/lib/capitalize'

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
  const isRegisterData = (data: LogInput | RegInput): data is RegInput => {
    return (data as RegInput).name !== undefined;
  };
  const onSubmit = async (data: LogInput | RegInput) => {
    const formData = new FormData();
  if (formName === 'registerForm' && isRegisterData(data)) {
    formData.append('name', data.name); 
  }
  formData.append('email', data.email);
  formData.append('password', data.password);

try {
  if (formName === 'loginForm') {
    const result = await loginUser( formData );
    if (result.success) {
      toast.success(
        `${capitalize(result?.user?.name) || 'Dude'}, you are logged in!`
      );
      reset();
      router.push('/dashboard');
    }
  } else {
    const result = await registerUser(formData);
    if (result.success) {
      toast.success(
        `${capitalize(result?.user.name)}, your registration was successful!`
      );
      reset();
      router.push('/login');
    }
    else if (!result.success) {

      setLogError(result?.error || '');
      console.log(result.error);
      
    }
  }
} catch (error) {
  const errorMessage =
    error instanceof Error ? error.message : 'An unknown error occurred';
  setLogError(errorMessage);
  toast.error(`An error occurred: ${errorMessage}`);
}
};

return(
  <div>
    <h2>{formName}</h2>
    <h2>{titleLabel}</h2>
  </div>
)
}
export default AuthForm