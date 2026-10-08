"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

const PAGE_SIZE = 8;

// Grilla (tabla) de productos con columnas:
// Producto (imagen) | Nombre | Precio | Proveedor | Acciones (editar, activar/desactivar)
export function ProductTable({products,handleToggleStatus}:{products: Product[];handleToggleStatus: (id: string, status: boolean) => Promise<void>}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const currentPage = Math.min(page, totalPages || 1);
  const firstProductIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = products.slice(firstProductIndex, firstProductIndex + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [products]);

  if (products.length === 0) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-zinc-500 shadow">
        No hay productos para este filtro.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-xs uppercase bg-[#09090B] text-white">
          <tr>
            <th className="px-4 py-3">Producto</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Proveedor</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {visibleProducts.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="px-4 py-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BLOB_URL}/${p.type}/${p.image}`}
                  alt={p.name}
                  width={56}
                  height={56}
                  className="h-18 w-18 rounded-lg object-cover"
                />
              </td>
              <td className="px-4 py-2">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-zinc-500">
                  {p.type} {p.status ? "" : "• Inactivo"}
                </div>
              </td>
              <td className="px-4 py-2">S/ {p.price.toFixed(2)}</td>
              <td className="px-4 py-2">{p.supplier}</td>
              <td className="px-4 py-2">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/productos/${p._id}/editar`}
                    className="rounded-lg bg-zinc-900 px-3 py-1.5 text-white hover:bg-zinc-700"
                    title="Editar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleToggleStatus(p._id, !p.status)}
                    className={`rounded-lg px-3 py-1.5 font-semibold text-white ${
                      p.status
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    title={p.status ? "Desactivar" : "Activar"}
                  >
                    {p.status ?
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg> 
                     : 
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    }
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-sm">
        <p className="text-zinc-600" aria-live="polite">
          Mostrando {firstProductIndex + 1}-{Math.min(firstProductIndex + PAGE_SIZE, products.length)} de {products.length} productos
        </p>
        <nav className="flex items-center gap-2" aria-label="Paginacion de productos">
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
