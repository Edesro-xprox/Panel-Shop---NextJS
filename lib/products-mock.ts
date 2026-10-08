import type { Product } from "@/types/product";

// Datos de ejemplo para maquetar el panel SIN backend.
// Cuando hagas el CRUD real, reemplaza estas funciones por fetch a tu API MERN.

const MOCK: Product[] = [
  {
    _id: "1",
    name: "Laptop Gamer X15",
    description: "Laptop de 15 pulgadas, 16GB RAM, SSD 512GB.",
    price: 3499.9,
    supplier: "TecnoPerú",
    type: "Laptop",
    image: "https://via.placeholder.com/80?text=Laptop",
    status: true,
  },
  {
    _id: "2",
    name: "Audífono Bass Pro",
    description: "Audífonos con cancelación de ruido.",
    price: 199.9,
    supplier: "AudioTotal",
    type: "Audífono",
    image: "https://via.placeholder.com/80?text=Audio",
    status: true,
  },
  {
    _id: "3",
    name: "Celular Nova 12",
    description: "Celular 128GB, cámara dual 50MP.",
    price: 1299,
    supplier: "MóvilCenter",
    type: "Celular",
    image: "https://via.placeholder.com/80?text=Celular",
    status: false,
  },
  {
    _id: "4",
    name: 'Televisor 55" 4K',
    description: 'Smart TV 55 pulgadas con HDR.',
    price: 2199,
    supplier: "ElectroHogar",
    type: "Televisor",
    image: "https://via.placeholder.com/80?text=TV",
    status: true,
  },
  {
    _id: "5",
    name: "Cámara Reflex D500",
    description: "Cámara réflex con lente 18-55mm.",
    price: 2799,
    supplier: "FotoMundo",
    type: "Cámaras",
    image: "https://via.placeholder.com/80?text=Camara",
    status: true,
  },
];

export function getMockProducts(): Product[] {
  return MOCK;
}

export function getMockProductById(id: string): Product | undefined {
  return MOCK.find((p) => p._id === id);
}
