
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import React from 'react';
import WebNavBar from '@/components/Website/WebNavBar';
import { getSession } from '@/actions/get-session';
import { auth } from '../../../auth';
// import { revalidateSession } from '@/actions/revalidateSession';

interface Props {
  children: React.ReactElement<{ session: Session }>; // Specify that children accepts session
}

async function Layout({ children }: Props) {
  const session = await auth();
  // const session = await getSession();


//  console.log('session1',session1, "session" ,session);
   if (!session) {
    redirect('/login'); 
  }

  return (
    <>
      {session && (
        <div className="min-h-screen flex flex-col items-center  gap-2 bg-[var(--website-bg)]">
          <WebNavBar session={session} />

          {/* {React.cloneElement(children, { session })} */}
          {children}
        </div>
      )}
    </>
  );
}

export default Layout;
