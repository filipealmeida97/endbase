import { getRefreshToken, setAuthCookies } from "@/lib/auth/cookies";

export async function refreshAccessToken() {
  const refresh = await getRefreshToken();
  if (!refresh) return null;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  if (!data?.access) return null;

  await setAuthCookies(data.access, refresh);
  return data.access as string;
}
