"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@/types/user";

const PAGE_SIZE = 8;

export function UserTable({ users }: { users: User[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const currentPage = Math.min(page, totalPages || 1);
  const firstUserIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleUsers = users.slice(firstUserIndex, firstUserIndex + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [users]);

  if (users.length === 0) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-zinc-500 shadow">
        No hay usuarios para esta búsqueda.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-[#09090B] text-xs uppercase text-white">
          <tr>
            <th className="px-4 py-3">Usuario</th>
            <th className="px-4 py-3">Contraseña</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {visibleUsers.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="px-4 py-3 font-semibold">{user.user}</td>
              <td className="px-4 py-3 text-zinc-500" aria-label="Contraseña protegida">
                ••••••••
              </td>
              <td className="px-4 py-2 text-right">
                <Link
                  href={`/usuarios/${encodeURIComponent(user._id)}`}
                  className="inline-flex rounded-lg bg-zinc-900 px-3 py-1.5 text-white hover:bg-zinc-700"
                  title={`Editar usuario ${user.user}`}
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-sm">
        <p className="text-zinc-600" aria-live="polite">
          Mostrando {firstUserIndex + 1}-
          {Math.min(firstUserIndex + PAGE_SIZE, users.length)} de {users.length} usuarios
        </p>
        <nav className="flex items-center gap-2" aria-label="Paginación de usuarios">
          <button
            type="button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md border px-3 py-1.5 text-zinc-700 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="min-w-16 text-center text-zinc-600">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md border px-3 py-1.5 text-zinc-700 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
          </button>
        </nav>
      </div>
    </div>
  );
}