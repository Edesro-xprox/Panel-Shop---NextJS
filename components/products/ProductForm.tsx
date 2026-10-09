"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, TypeProduct } from "@/types/product";
import productService from "@/services/productService";
import useProduct from "@/hooks/useProduct";

// Formulario para CREAR y EDITAR (misma vista, como pediste).
// - Si recibe `initialProduct`, edita. Si no, crea uno nuevo.
// - Por ahora solo muestra los datos en consola (sin CRUD real).

const typeMapping = {
  "Laptop": "laptop",
  "Audífono": "headphone",
  "Celular": "cellphone",
  "Televisor": "television",
  "Cámaras": "camera"
}

export function ProductForm({ product }: { product?: Product | null }) {
  const router = useRouter();
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [type, setType] = useState<string>(product?.type ?? "laptop");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [saveError, setSaveError] = useState("");
  const initialImageUrl = product?.image
    ? `${process.env.NEXT_PUBLIC_BLOB_URL}/${product.type}/${product.image}`
    : "";
  const [preview, setPreview] = useState(initialImageUrl);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setSelectedImage(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");

    const productData = {
      name,
      description,
      price: Number(price),
      type,
      supplier: product?.supplier ?? "",
      image: selectedImage ?? undefined,
    };

    const savedProduct = product?._id
      ? await productService.updateProduct(product._id, productData)
      : await productService.addProduct(productData);

    if (!savedProduct) {
      setSaveError("No se pudo guardar el producto. Verifica la conexión con el servidor.");
      return;
    }

    router.push("/productos");
  };

  const inputClass = "w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600";
  return (
    <form onSubmit={handleSave} className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-bold">
        {product ? "Editar producto" : "Nuevo producto"}
      </h2>



      <div className="grid sm:grid-cols-3">
        <div className="sm:col-span-1">
          {/* Imagen */}
          <label className="mb-4 block text-sm font-medium">Imagen del producto</label>
          <div className="flex flex-col items-center gap-4">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Vista previa" className="h-40 w-40 rounded-lg object-cover" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-zinc-100 text-xs text-zinc-500">
                Sin imagen
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageSelect} className="text-sm" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={`${inputClass} mb-4`} required />

          <label className="mb-1 block text-sm font-medium">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} mb-4`}
            rows={3}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Precio</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`${inputClass} mb-4`}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Tipo</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TypeProduct)}
                className={`${inputClass} mb-4`}
              >
                {Object.entries(typeMapping).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {saveError && <p role="alert" className="mt-3 text-sm text-red-600">{saveError}</p>}

      <div className="mt-2 flex gap-2">
        <button type="submit" className="rounded-lg bg-amber-600 px-5 py-2 font-semibold text-white hover:bg-amber-700">
          Guardar
        </button>
        <button
          type="button"
          onClick={() => router.push("/productos")}
          className="rounded-lg bg-zinc-200 px-5 py-2 hover:bg-zinc-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
