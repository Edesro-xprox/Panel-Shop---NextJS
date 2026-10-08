"use client";

import { useParams } from "next/navigation";
import { ProductForm } from "@/components/products/ProductForm";
import useProduct from "@/hooks/useProduct";

// Ruta: /productos/[id]/editar — botón "Editar" de cada fila.
export default function EditProductPage() {
  const { products } = useProduct();
  const { id } = useParams<{ id: string }>();
  const productToEdit = products.find((p) => p._id === id);
  
  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Editar:</h1>
      <ProductForm key={productToEdit?._id ?? "loading"} product={productToEdit} />
    </div>
  );
}
