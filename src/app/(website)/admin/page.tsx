import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import capitalize from "@/lib/capitalize";


const AdminPage = async () => {

    const session = await auth();
    const user = session?.user
    const userRole = session?.user?.role
    if(userRole !== 'admin') redirect('/dashboard')
  
  return (
    <div>
      <h2>Admin page</h2>
      <p>Logged in as {capitalize(user?.name) }</p>
      <p>With email {user?.email}</p>
      <p>With role {user?.role}</p>
    </div>
  )
}
export default AdminPage