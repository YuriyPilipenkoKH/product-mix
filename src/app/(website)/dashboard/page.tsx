import UserInfo from '@/components/User/UserInfo';
import React from 'react';
import { auth } from '../../../../auth';


const DashboardPage =  async() => {
const session = await auth();
console.log(session)
  return (
    <div className="grid gap-1 h-full">
        <UserInfo/>
    </div>
  );
};

export default DashboardPage;
