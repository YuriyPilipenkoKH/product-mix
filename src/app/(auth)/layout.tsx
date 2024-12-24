import Logo from '@/components/Logo';
import { imageProps } from '@/data/imageProps';
import { ReactNode } from 'react'
interface Props {
    children: ReactNode;
  }

function Layout({ children }: Props) {
  return (
    <div className='min-h-screen flex flex-col gap-4 items-center justify-center text-slate-300 bg-[var(--auth-bg)]'>
      <Logo src={imageProps.authLogo}/>
        {children}
    </div>
  )
}

export default Layout