import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { getSession } from "next-auth/react";

export default async function Home() {
  const store = await cookies();
  const railsSession = store.get('rails_session')?.value ?? null;

  if (railsSession) {
    redirect("/question");
  } else {
    redirect("/login");
  }
}
