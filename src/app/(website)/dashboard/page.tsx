import { getSession } from '@/actions/getSession';
import { redirect } from 'next/navigation';
import React from 'react';



const DashboardPage =  async() => {
  const session = await getSession();
  // const session = await revalidateSession();
  if (!session) {
    redirect('/login'); 

  }
  // const { user } = session;
  return (
    <div className="grid gap-1 h-full">

    </div>
  );
};

export default DashboardPage;
