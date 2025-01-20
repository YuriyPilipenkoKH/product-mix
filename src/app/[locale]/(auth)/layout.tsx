import Navigation from '@/components/Navigation';
import React, { ReactNode, isValidElement, cloneElement } from 'react';
interface Props {
    children: ReactNode;
    params: Promise<{ locale: string }>;
  }
interface ChildWithLocale {
    locale?: string;
  }

  async function AuthLayout({ children, params }: Props) {
  const { locale } =await params;
  return (
    <div className=' h-full flex flex-col gap-4 items-center  text-slate-300 bg-[var(--auth-bg)]'>
        <Navigation locale={locale}/>
      <div className='absolute top-[1rem] left-[1rem]'>
      </div>
      {isValidElement<ChildWithLocale>(children)
        ? cloneElement(children, { locale })
        : children}
    </div>
  )
}

export default AuthLayout