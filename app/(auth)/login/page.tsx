import { LoginForm } from "@/components/auth/LoginForm";

// Ruta: /login
// Usa el grupo (auth) para no mostrar el sidebar aquí.
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
      <LoginForm />
    </main>
  );
}
