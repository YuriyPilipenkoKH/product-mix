import React from 'react'
import { getSession } from '@/actions/getSession';
import capitalize from '@/lib/capitalize';

const UserInfo = async () => {
    const session = await getSession();
  return (
    <div>UserInfo</div>
  )
}

export default UserInfo