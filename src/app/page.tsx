import { getServerSession } from "next-auth";
import { authConfig } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/auth");
  }
  return <main></main>;
}
