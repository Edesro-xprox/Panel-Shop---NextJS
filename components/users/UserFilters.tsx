"use client";

import Link from "next/link";

export function UserFilters({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar por usuario..."
        aria-label="Buscar usuarios"
        className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600"
      />

      <Link
        href="/usuarios/nuevo"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
        title="Agregar usuario"
      >
        <span className="text-xl leading-none">+</span> Nuevo
      </Link>
    </div>
  );
}
