import Logo from '@/components/Logo';
import { ReactNode } from 'react'
interface Props {
    children: ReactNode;
  }

function Layout({ children }: Props) {
  return (
    <div className='min-h-screen flex flex-col gap-4 items-center justify-center text-slate-300 bg-[var(--auth-bg)]'>
      <Logo src='https://res.cloudinary.com/dwdkw1a4j/image/upload/v1735033314/product-mix/logo/uzzykiyrg9egse1k5dy7.png'/>
        AuthJS
        {children}
    </div>
  )
}

export default Layout