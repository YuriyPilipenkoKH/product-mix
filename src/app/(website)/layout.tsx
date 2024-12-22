import { LogoutButton } from '@/components/Button/Button';
import { ReactNode } from 'react'

interface Props {
    children: ReactNode;
  }

function Layout({ children }: Props) {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-2 bg-[var(--website-bg)]'>
        <div className='flex gap-2'>
          <h2>Website</h2>
          <LogoutButton/>
        </div>
        
        {children}
    </div>
  )
}

export default Layout