"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";

// Barra lateral colapsable del panel.
// - `collapsed`: true = solo iconos, false = iconos + texto
// - El padre (`(panel)/layout.tsx`) controla el estado y el contenido lateral.

const MENUS = [
  { href: "/productos", label: "PRODUCTOS", icon: "📦" },
  { href: "/usuarios", label: "USUARIOS", icon: "👥" },
];

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside
      className={`flex min-h-screen flex-col bg-zinc-950 text-white transition-all ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Parte superior: logo */}
      <div className="flex items-center justify-center border-b border-white/10 p-4">
        <Logo compact={collapsed} />
      </div>

      {/* Botón contraer/expandir */}
      <button
        onClick={onToggle}
        className="mx-3 mt-3 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
        title={collapsed ? "Expandir menú" : "Contraer menú"}
      >
        {collapsed ? "→" : "←"}
      </button>

      {/* Menús */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {MENUS.map((m) => {
          const isActive = pathname.startsWith(m.href);
          return (
            <Link
              key={m.href}
              href={m.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold tracking-wide ${
                isActive ? "bg-amber-600 text-white" : "hover:bg-white/10"
              }`}
            >
              <span className="text-lg">{m.icon}</span>
              {!collapsed && <span>{m.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Usuario + salir */}
      <div className="border-t border-white/10 p-3 text-sm">
        {!collapsed && (
          <p className="mb-2 truncate text-zinc-400">
            {user ?? "Administrador"}
          </p>
        )}
        <button
          onClick={logout}
          className="w-full rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20"
        >
          {collapsed ? "⏻" : "⏻ Cerrar sesión"}
        </button>
      </div>
    </aside>
  );
}
