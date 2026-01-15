import { NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/auth/cookies";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { detail: "username e password são obrigatórios" },
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiUrl}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { detail: err?.detail ?? "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const data = await res.json();

    // Esperado: { refresh, access }
    if (!data?.access || !data?.refresh) {
      return NextResponse.json(
        { detail: "Resposta inesperada do servidor" },
        { status: 500 }
      );
    }

    // salva tokens de forma segura (HttpOnly cookie)
    setAuthCookies(data.access, data.refresh);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { detail: "Erro interno no login" },
      { status: 500 }
    );
  }
}
