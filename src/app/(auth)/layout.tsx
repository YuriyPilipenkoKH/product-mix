import { ReactNode } from 'react'
interface Props {
    children: ReactNode;
  }

function Layout({ children }: Props) {
  return (
    <div className='h-full flex flex-col gap-4 items-center justify-center bg-[var(--auth-bg)]'>
        Auth
        {children}
    </div>
  )
}

export default Layout