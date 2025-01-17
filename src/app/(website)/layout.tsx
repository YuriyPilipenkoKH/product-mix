
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import React from 'react';
import WebNavBar from '@/components/Website/WebNavBar';
import { auth } from '../../../auth';


interface Props {
  children: React.ReactElement<{ session: Session }>; // Specify that children accepts session
}

async function Layout({ children }: Props) {
  const session = await auth();

   if (!session) redirect('/login'); 
  return (
    <>
      {session && (
        <div className="min-h-screen flex flex-col items-center  gap-2 bg-[var(--website-bg)]">
          <WebNavBar session={session} />
         
          {children}
        </div>
      )}
    </>
  );
}

export default Layout;
