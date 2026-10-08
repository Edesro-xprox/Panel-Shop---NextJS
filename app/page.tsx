import { redirect } from "next/navigation";

// Ruta raíz: manda directo al login.
export default function Home() {
  redirect("/login");
}
