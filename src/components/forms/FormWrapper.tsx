
import { AuthFormBaseTypes } from '@/types/formTypes';
import React from 'react'
import { FaRegistered } from "react-icons/fa";
import { LuKeyRound } from "react-icons/lu";
import FormHeader from './FormHeader';
import { BtnX } from '../Button/Button';
import SocialLogin from '../auth/SocialLogin';

interface FormWrapperProps {
  children: React.ReactNode;
  formProps: AuthFormBaseTypes
}

const FormWrapper = ({
  children,
  formProps
}: FormWrapperProps) => {
  const {
    formName,
    titleLabel,
    welcomeMsg,
    backButtonLabel,
    backButtonHref,
    showSocial
  } = formProps
  return (
    <div className='shadow-sm rounded-md w-[400px]'>
      <FormHeader 
      titleLabel={titleLabel}
      welcomeMsg={welcomeMsg}
      />
        <div className='p-2'>
          {children}
        </div>
       {showSocial && (
        <SocialLogin />
       )} 
       <div className='flex w-full justify-center items-center mt-8'>
          <BtnX
            href={backButtonHref}
            label={backButtonLabel}> 
            {(formName === 'loginForm') 
            ? <FaRegistered/>
            : <LuKeyRound/>}
          </BtnX >
       </div>
    </div>
  )
}

export default FormWrapper