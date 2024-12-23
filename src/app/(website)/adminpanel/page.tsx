import { getSession } from "@/lib/getSession"


const AdminPage =async () => {
  const session = await getSession()
  const user = session?.user
  console.log(user);
  
  return (
    <div>
      <h2>Admin page</h2>
      {/* <UsersList/> */}
      {/* <UserRoleManager 
      user={user} 
      onRoleChange ={change}
       /> */}
    </div>
  )
}
export default AdminPage