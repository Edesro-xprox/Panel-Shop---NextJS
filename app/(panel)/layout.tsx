"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";

// Layout del panel (sidebar + contenido).
// Todas las rutas dentro de (panel) lo usan: /productos, /usuarios, etc.
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  // Si no hay sesión, vuelve al login.
  useEffect(() => {
    if (ready && !user) router.push("/login");  
  }, [ready, user, router]);

  if (!ready) return <p className="p-8">Cargando panel...</p>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-zinc-100">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      {/* Contenido del menú seleccionado */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
