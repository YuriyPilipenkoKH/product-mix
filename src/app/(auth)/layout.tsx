import { getSession } from '@/actions/get-session';
import Logo from '@/components/Logo';
import { imageProps } from '@/data/imageProps';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'
interface Props {
    children: ReactNode;
  }

async function Layout({ children }: Props) {
    const session = await getSession();
    if (session) {
      redirect('/dashboard')
    }
  return (
    <div className='min-h-screen flex flex-col gap-4 items-center justify-center text-slate-300 bg-[var(--auth-bg)]'>
      <div className='absolute top-[1rem] left-[1rem]'>
        <Logo src={imageProps.authLogo}/>
      </div>
        {children}
    </div>
  )
}

export default Layout