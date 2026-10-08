"use client";

import Link from "next/link";
import { PRODUCT_TYPES } from "@/lib/constants";
import type { FilterTypeProduct } from "@/types/product";

// Barra superior de PRODUCTOS:
// izquierda = combo de tipo + buscador, derecha = botón "+" (nuevo).
export function ProductFilters({
  type,
  search,
  onTypeChange,
  onSearchChange,
}: {
  type: FilterTypeProduct;
  search: string;
  onTypeChange: (t: FilterTypeProduct) => void;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value as FilterTypeProduct)}
          className="rounded-lg border px-3 py-2"
          aria-label="Tipo de producto"
        >
          {PRODUCT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre..."
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600"
        />
      </div>

      <Link
        href="/productos/nuevo"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
        title="Agregar producto"
      >
        <span className="text-xl leading-none">+</span> Nuevo
      </Link>
    </div>
  );
}
