
import { AuthFormBaseTypes } from '@/types/formTypes';
import React from 'react'
// import FormHeader from './FormHeader';
// import { BtnX } from '../Button/Button';
// import SocialLogin from '../OAuth/SocialLogin';
import { FaRegistered } from "react-icons/fa";
import { LuKeyRound } from "react-icons/lu";

interface FormWrapperProps {
  children: React.ReactNode;
  formProps: AuthFormBaseTypes
  // formName: string
  // titleLabel: string;
  // welcomeMsg: string
  // backButtonLabel: string;
  // backButtonHref: string;
  // showSocial?: boolean
  
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
    <div className='shadow-sm rounded-md bg-green-200'>
      <FormHeader 
      titleLabel={titleLabel}
      welcomeMsg={welcomeMsg}
      />
        <div className='p-2'>
          {children}
        </div>
       {showSocial && (
        // <SocialLogin/>
        <div></div>
       )} 
       <div className='flex w-full justify-center items-center mt-4'>
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