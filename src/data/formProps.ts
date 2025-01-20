"use server"
import {AuthFormBaseTypes} from "@/types/formTypes";


export const getLoginFormProps  = async (t: (key: string) => string): Promise<AuthFormBaseTypes> => ({
  formName: 'loginForm',
  titleLabel: t('login.titleLabel'),
  welcomeMsg: t('login.welcomeMsg'),
  backButtonLabel: t('login.backButtonLabel'),
  backButtonHref: '/register',
  showSocial: true,
});

export const getRegisterFormProps = async (t: (key: string) => string): Promise<AuthFormBaseTypes> => ({
  formName: 'registerForm',
  titleLabel: t('register.titleLabel'),
  welcomeMsg: t('register.welcomeMsg'),
  backButtonLabel: t('register.backButtonLabel'),
  backButtonHref: '/login',
  showSocial: false,
});

// export const AddNewCollectionFormProps: FormBaseTypes = {
//   formName: 'AddNewCollectionForm',
//   dimentions: ['300px', '170px','420px','250px'],
//   title: '',
//   text: '',
// };
