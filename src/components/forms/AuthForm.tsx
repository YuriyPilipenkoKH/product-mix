'use client'
import { AuthFormBaseTypes } from "@/types/formTypes"

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
return(
  <div>
    <h2>{formName}</h2>
    <h2>{titleLabel}</h2>
  </div>
)
}
export default AuthForm