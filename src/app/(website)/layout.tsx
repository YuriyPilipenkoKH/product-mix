import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import React from 'react';
import { LogoutButton } from '@/components/Button/Button';
interface Props {
  children: React.ReactElement<{ session: Session }>; // Specify that children accepts session
}

async function Layout({ children }: Props) {
  const session = await getSession();
  if (!session) {
    redirect('/login'); // Redirect if no session
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 bg-[var(--website-bg)]">
      <div className="flex gap-2">
        <h2>Website</h2>
        <LogoutButton />
      </div>
      {/* {React.cloneElement(children, { session })} */}
      {children}
    </div>
  );
}

export default Layout;
