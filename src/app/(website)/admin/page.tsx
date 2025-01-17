import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import capitalize from "@/lib/capitalize";
import { watchRole } from "@/actions/watch-role";
import Link from "next/link";


const AdminPage = async () => {

  const session = await auth();
  if (!session) redirect('/login'); 

  const email = session?.user?.email;
  if (!email) redirect('/dashboard');

  const formData = new FormData();
  formData.append("email", email);

  const userRole = await watchRole(formData); // Call server action
  if (userRole !== 'admin') redirect('/dashboard'); 
  
  return (
    <div>
      <h2>Admin page</h2>

      <div>name{' '}{capitalize(session?.user?.name)}</div>
      <div>role{' '}{userRole}</div>
      <div>photo{' '}{session?.user?.image}</div>
    </div>
  )
}
export default AdminPage