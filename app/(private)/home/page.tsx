//app/(private)/home.tsx
"use client";

import { useState } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { TextPressure } from "@/components/animation";

export default function HomePage() {
  const [ativos, setAtivos] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLoadAtivos() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/ativos", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail ?? "Erro ao buscar ativos");
      }

      const data = await res.json();
      setAtivos(data);
    } catch (e: any) {
      setError(e.message ?? "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6 bg-zinc-950 text-white">
      <div className="max-w-sm mx-auto space-y-4 text-center">
        <TextPressure text="Home!" />

        <div className="mt-6 flex flex-col items-center gap-3">
          <LogoutButton />

          <button
            onClick={handleLoadAtivos}
            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Ativos"}
          </button>
        </div>

        {error && (
          <div className="p-3 rounded bg-red-500/20 border border-red-500/40">
            {error}
          </div>
        )}

        {ativos && (
          <pre className="p-4 rounded bg-black/40 border border-white/10 overflow-auto text-xs text-left">
            {JSON.stringify(ativos, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
