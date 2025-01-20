'use client'
import { useEffect, useState } from "react"
import '../styles/FormStyles.css'
import { LogInput, LoginSchema, RegInput, RegisterSchema } from '@/models/auth'
import { AuthFormBaseTypes } from "@/types/formTypes"
import { useRouter } from "next/navigation"
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useForm } from 'react-hook-form'
import { registerUser } from '@/actions/register-user'
import { loginUser } from '@/actions/login-user'
import toast from 'react-hot-toast'
import capitalize from '@/lib/capitalize'
import FormWrapper from './FormWrapper'
import { CgCloseO } from 'react-icons/cg'
import { FlatBtn } from '../Button/Button'
import { retrieveToken } from '@/lib/retrieveToken'
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface AuthFormProps {
  formProps: AuthFormBaseTypes
  locale: string
}

const AuthForm:React.FC<AuthFormProps> = ({formProps}) => {
  const t = useTranslations('AuthForm');
  const {
    formName,
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

    const nextAuthSignIn = async (userName: string) => {
     // Use `signIn` client-side to complete authentication
     const signInResponse = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (signInResponse?.error) {
      console.error("SignIn error:", signInResponse.error);
      return;
    }
    if (signInResponse?.ok){
      toast.success( (formName === 'loginForm')
       ?  `Welcome back, ${capitalize(userName)}! `         
       :  `${capitalize(userName)}, your registration was successful! `       
      );
    } 
    }

try {
  if (formName === 'loginForm') {
    const result = await loginUser( formData );

    if (result.success && result?.user?.name) {
      await nextAuthSignIn(result?.user?.name)
      reset();
      router.push('/dashboard');
    } 
    else if (!result.success) {
      setLogError(result?.error || '');
      console.log(result.error);
    }

  } else if (formName === 'registerForm') {
    const result = await registerUser(formData);

    if (result.success && result?.user?.name) {
      await nextAuthSignIn(result?.user?.name)
      reset();
      router.push('/dashboard');
    }
    else if (!result.success) {
      setLogError(result?.error || '');
      console.log(result.error);
    }
  }
  }
  catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    setLogError(errorMessage);
    toast.error(`An error occurred: ${errorMessage}`);
  }
  };
  const handleInputChange =   (field: keyof LogInput | keyof RegInput) => {
    if(logError) setLogError('')
     
    }
  const onInvalid = () => {
    setLogError('Please fill in all required fields');
    };

    useEffect(() => {
      const fetchCsrfToken = async () => {
        const token = await retrieveToken(); 
        setCsrfToken(token); 
      };
        fetchCsrfToken();
    }, []);
  
    const isRegisterErrors = (
      errors: Partial<FieldErrors <LogInput | RegInput>>
    ): errors is Partial <FieldErrors<RegInput>> => {
      return 'name' in errors;
    };

return(
  <FormWrapper  formProps={formProps} >
  <form
    onSubmit={handleSubmit(onSubmit, onInvalid)}
    className='AuthForm  flex flex-col gap-3 items-center relative w-full'
    autoComplete="off"
    noValidate>
  {(formName === 'loginForm') && csrfToken && <input type="hidden" name="csrfToken" value={csrfToken} />}
  {(formName === 'registerForm') && (
  <>
    <label 
    className={cn("formLabel input input-bordered flex items-center gap-2",
      isRegisterErrors(errors)? 'highlight-error':'highlight-success',
    )}>
    <input 
     className={cn('grow' )}
    {...register('name', { onChange: handleInputChange })}
      placeholder=	{( isSubmitting ) 
        ? "Processing" 
        : t('register.inputs.name')}
    />
    </label>
  </>
  )}
  <label 
  className={cn("formLabel input input-bordered flex items-center gap-2",
    (errors.email || logError) ? 'highlight-error':'highlight-success',
  )}>
  <input
  className={cn('grow' )} 
  {...register('email', { onChange: handleInputChange })}
    placeholder=	{( isSubmitting ) 
      ? "Processing" 
      : t('register.inputs.email')}
  />
  </label>
  <label 
    className={cn("formLabel input input-bordered flex items-center gap-2",
      errors.password ? 'highlight-error':'highlight-success',
    )}>
    <input
    className={cn('grow' )}
       {...register('password')}
       onChange={(e) => {
         register('password').onChange(e);
         handleInputChange('password');
       }}
      placeholder={isSubmitting 
        ? "Processing" 
        : t('register.inputs.password')}
      />
  </label>
  <button
    className='AuthFormSubmitBtn mt-auto btn btn-active btn-outline w-full'
    type='submit'
    disabled={isSubmitting || !isDirty || !isValid || !!logError}
        >
    { isLoading  ? "Sending.." : (formName === 'registerForm' )
      ? t('register.submitButtonLabel')  : t('login.submitButtonLabel')}
  </button>
    {(isRegisterErrors(errors)  || errors.email || errors.password || logError) && (
      <div className="autherror w-full">
        { isRegisterErrors(errors) && errors.name && <div>{errors.name.message}</div>}
        { !isRegisterErrors(errors) && errors.email && <div>{errors.email.message}</div>}
        { !isRegisterErrors(errors) && !errors.email && errors.password && <div>{errors.password.message}</div>}
        { !isRegisterErrors(errors) && !errors.email && !errors.password && logError && <div>{logError}</div>}
        <FlatBtn onClick={() => {
          setLogError('')
          reset()
          }}>
          <CgCloseO size={30} />
        </FlatBtn>
      </div>
    )}
</form>
</FormWrapper>
)
}
export default AuthForm