import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page() {
  const store = await cookies();

  const access = store.get("access_token")?.value;
  const refresh = store.get("refresh_token")?.value;

  // se tem access OU refresh, consideramos autenticado (refresh renova depois)
  if (access || refresh) {
    redirect("/home");
  }

  redirect("/login");
}
