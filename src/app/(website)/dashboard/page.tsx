import UserInfo from '@/components/User/UserInfo';
import React from 'react';


const DashboardPage =  async() => {

  // const { user } = session;
  return (
    <div className="grid gap-1 h-full">
        <UserInfo/>
    </div>
  );
};

export default DashboardPage;
