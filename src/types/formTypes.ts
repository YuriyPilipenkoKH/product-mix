import { LogInput, RegInput } from "@/models/auth";

export interface FormBaseTypes {
  formName: string;
  dimentions: string[];
  title?: string;
  text?: string;
}
export interface AuthFormBaseTypes {

  formName: 'loginForm' | 'registerForm';
  titleLabel: string;
  welcomeMsg: string
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
}

export type FormName = 'loginForm' | 'registerForm';

export type AuthInput<T extends FormName> = T extends 'loginForm' ? LogInput : RegInput;
