import { getSession } from "@/lib/getSession"


const AdminPage =async () => {
  const session = await getSession()
  const user = session?.user
  const userRole = user?.role;
  console.log(user);
  
  return (
    <>
      {userRole === 'admin' && (
        <h2>Admin page</h2>
      )}
    </>
  )
}
export default AdminPage