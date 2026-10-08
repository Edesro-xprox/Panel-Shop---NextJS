"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Formulario de login. Solo pide usuario y contraseña.
// Al entrar, guarda sesión simulada y redirige a /productos.
export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(user, password);
    if (ok) router.push("/productos");
    else setError("Ingresa usuario y contraseña.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
    >
      <h1 className="mb-6 text-center text-2xl font-extrabold">
        Panel NextShop
      </h1>

      <label className="mb-1 block text-sm font-medium">Usuario</label>
      <input
        className="mb-4 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="admin"
        autoComplete="username"
      />

      <label className="mb-1 block text-sm font-medium">Contraseña</label>
      <input
        type="password"
        className="mb-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••"
        autoComplete="current-password"
      />

      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="mt-2 w-full rounded-lg bg-amber-600 py-2 font-semibold text-white hover:bg-amber-700"
      >
        Ingresar
      </button>

      <p className="mt-4 text-center text-xs text-zinc-500">
        Demo: usa cualquier usuario y clave (ej: admin / 123456)
      </p>
    </form>
  );
}
