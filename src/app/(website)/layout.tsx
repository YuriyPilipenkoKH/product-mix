
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import React from 'react';
import WebNavBar from '@/components/Website/WebNavBar';
// import { revalidateSession } from '@/actions/revalidateSession';

interface Props {
  children: React.ReactElement<{ session: Session }>; // Specify that children accepts session
}

async function Layout({ children }: Props) {
  // const session1 = await revalidateSession();

//  console.log('session1',session1, "session" ,session);
   if (!session) {
    redirect('/login'); 
  }

  return (
    <>
      {session && (
        <div className="min-h-screen flex flex-col items-center  gap-2 bg-[var(--website-bg)]">
          <WebNavBar session={session} />
          <div className="flex gap-2">
            <h2>Product Mix</h2>      
          </div>
          {/* {React.cloneElement(children, { session })} */}
          {children}
        </div>
      )}
    </>
  );
}

export default Layout;
