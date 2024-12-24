import Logo from '@/components/Logo';
import { imageProps } from '@/data/imageProps';
import { ReactNode } from 'react'
interface Props {
    children: ReactNode;
  }

function Layout({ children }: Props) {
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