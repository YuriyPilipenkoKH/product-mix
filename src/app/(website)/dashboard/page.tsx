import capitalize from '@/lib/capitalize';
import { getSession } from '@/lib/getSession';
import React from 'react';


const DashboardPage =  async() => {
  const session = await getSession();
  const user = session?.user
  const userName = user?.name;
  const userEmail = user?.email;
  const userRole = user?.role
 

  return (
    <div className="grid gap-1 h-full">
      <p>Logged in as {userName && capitalize(userName) || 'User'}</p>
      <p>with email {userEmail}</p>
      <p>with role {userRole}</p>
    </div>
  );
};

export default DashboardPage;
