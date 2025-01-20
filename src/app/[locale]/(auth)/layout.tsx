

import Navigation from '@/components/Navigation';
import { ReactNode } from 'react'
interface Props {
    children: ReactNode;
    params: Promise<{ locale: string }>;
  }

async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}){
  const { locale } =await params;
  return (
    <div className='min-h-screen flex flex-col gap-4 items-center  text-slate-300 bg-[var(--auth-bg)]'>
                <Navigation locale={locale}/>
      <div className='absolute top-[1rem] left-[1rem]'>
      </div>
        {children}
    </div>
  )
}

export default AuthLayout