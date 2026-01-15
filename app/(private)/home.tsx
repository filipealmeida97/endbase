"use client";

import { useState } from "react";

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
      <div className="max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold">Home</h1>

        <button
          onClick={handleLoadAtivos}
          className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Ativos"}
        </button>

        {error && (
          <div className="p-3 rounded bg-red-500/20 border border-red-500/40">
            {error}
          </div>
        )}

        {ativos && (
          <pre className="p-4 rounded bg-black/40 border border-white/10 overflow-auto text-xs">
            {JSON.stringify(ativos, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
