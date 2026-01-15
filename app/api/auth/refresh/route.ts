import { NextResponse } from "next/server";
import { getRefreshToken, setAuthCookies } from "@/lib/auth/cookies";

export async function POST() {
  try {
    const refresh = getRefreshToken();

    if (!refresh) {
      return NextResponse.json({ detail: "Sem refresh token" }, { status: 401 });
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiUrl}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { detail: "Refresh inválido/expirado" },
        { status: 401 }
      );
    }

    const data = await res.json();

    if (!data?.access) {
      return NextResponse.json(
        { detail: "Resposta inesperada do servidor" },
        { status: 500 }
      );
    }

    // mantém o refresh antigo, troca só o access
    setAuthCookies(data.access, refresh);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ detail: "Erro no refresh" }, { status: 500 });
  }
}
