import { getSession } from "@/lib/getSession"
import { redirect } from "next/navigation";


const AdminPage =async () => {
  const session = await getSession()
  const user = session?.user
  const userRole = user?.role;
  
  if(userRole !== 'admin') redirect('/dashboard')
  
  return (
    <>
      {userRole === 'admin' && (
        <h2>Admin page</h2>
      )}
    </>
  )
}
export default AdminPage