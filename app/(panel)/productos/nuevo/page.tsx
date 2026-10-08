import { ProductForm } from "@/components/products/ProductForm";

// Ruta: /productos/nuevo — botón "+" de la grilla.
export default function NewProductPage() {
  return (
    <div className="">
      <h1 className="mb-4 text-xl font-bold">Nuevo producto</h1>
      <ProductForm />
    </div>
  );
}
