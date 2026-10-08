import type { ProductTypeFilter } from "@/types/product";

// Opciones del combo de la vista PRODUCTOS.
// Deben coincidir con lo pedido: Laptop, Audífono, Celular, Televisor, Cámaras y Todos.
export const PRODUCT_TYPES: ProductTypeFilter[] = [
  "Todos",
  "Laptop",
  "Audífono",
  "Celular",
  "Televisor",
  "Cámaras",
];
