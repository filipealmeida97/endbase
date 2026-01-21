"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      router.push("/login");
      router.refresh(); // limpa estado de rota/cache
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-3 py-2 rounded bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition text-sm"
    >
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}
