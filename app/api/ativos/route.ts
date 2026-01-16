import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth/cookies";
import { refreshAccessToken } from "@/lib/auth/refreshAccess";

async function fetchAtivos(access: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return fetch(`${apiUrl}/api/ativos/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
}

export async function GET() {
  try {
    let access = await getAccessToken();

    if (!access) {
      return NextResponse.json({ detail: "Não autenticado" }, { status: 401 });
    }

    let res = await fetchAtivos(access);

    if (res.status === 401) {
      const newAccess = await refreshAccessToken();
      if (!newAccess) {
        return NextResponse.json({ detail: "Sessão expirada" }, { status: 401 });
      }
      access = newAccess;
      res = await fetchAtivos(access);
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ detail: "Erro interno" }, { status: 500 });
  }
}
