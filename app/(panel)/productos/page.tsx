"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductTable } from "@/components/products/ProductTable";
import { getMockProducts } from "@/lib/products-mock";
import type { FilterTypeProduct, Product } from "@/types/product.ts";
import productService from "@/services/productService";
import useProduct from "@/hooks/useProduct";

// Ruta: /productos — primera vista del menú PRODUCTOS.
export default function ProductsPage() {
  const { products, type, setType, search, setSearch, handleToggleStatus } = useProduct();

  return (
    <div className="bg-white p-5 rounded">
      <h1 className="mb-4 text-xl font-bold">Productos</h1>
      <ProductFilters
        type={type}
        search={search}
        onTypeChange={setType}
        onSearchChange={setSearch}
      />
      <ProductTable products={products} handleToggleStatus={handleToggleStatus} />
    </div>
  );
}
