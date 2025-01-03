import { revalidateSession } from "@/actions/revalidate-session";

export async function GET(req: Request) {
  const session = await revalidateSession();
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(JSON.stringify(session), { status: 200 });
}