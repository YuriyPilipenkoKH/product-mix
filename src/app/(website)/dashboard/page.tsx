
import capitalize from '@/lib/capitalize';
import { getSession } from '@/actions/getSession';
import { redirect } from 'next/navigation';
import React from 'react';



const DashboardPage =  async() => {
  const session = await getSession();
  // const session = await revalidateSession();
  if (!session) {
    redirect('/login'); 
    // return (
    //   <div>
    //     <p>Session expired or invalid. Please log in again.</p>
    //   </div>
    // );
  }
  const { user } = session;
  return (
    <div className="grid gap-1 h-full">
      <p>Logged in as {capitalize(user?.name) || "User"}</p>
      <p>With email {user?.email}</p>
      <p>With role {user?.role}</p>
    </div>
  );
};

export default DashboardPage;
