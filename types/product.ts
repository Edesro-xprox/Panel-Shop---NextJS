// Tipos centrales del panel.
// Si mañana conectas el backend MERN, solo cambia `lib/` para llamar a tu API.
// La UI no debería cambiar.

export type TypeProduct =
  | "Laptop"
  | "Audífono"
  | "Celular"
  | "Televisor"
  | "Cámaras";

export type FilterTypeProduct = TypeProduct | "Todos";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  supplier: string;
  type: TypeProduct;
  image: string; // URL o ruta en /public
  status: boolean; // true = vigente, false = desactivado
}
