import capitalize from '@/lib/capitalize';
import { getSession } from '@/lib/getSession';
import { Session } from 'next-auth';

import React from 'react';

interface DashboardPageProps {
  session: Session
}


const DashboardPage:React.FC<DashboardPageProps> =  async() => {
  const session = await getSession();
  const user = session?.user
  const userName = user?.name;
  const userEmail = user?.email;

  return (
    <div className="grid gap-1">
      <p>Logged in as {userName && capitalize(userName) || 'User'}</p>
      <p>with email {userEmail}</p>
    </div>
  );
};

export default DashboardPage;
