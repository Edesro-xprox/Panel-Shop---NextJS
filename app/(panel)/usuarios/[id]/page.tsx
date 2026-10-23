"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserForm } from "@/components/users/UserForm";
import userService from "@/services/userService";
import type { User } from "@/types/user";

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const data = await userService.getUserById(id);
        if (!cancelled) setUser(data);
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Ocurrió un error al cargar el usuario.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchUser();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-zinc-500 shadow">
        Cargando usuario...
      </p>
    );
  }

  if (loadError) {
    return (
      <p role="alert" className="rounded-xl bg-white p-8 text-center text-red-600 shadow">
        {loadError}
      </p>
    );
  }

  if (!user) {
    return (
      <p role="alert" className="rounded-xl bg-white p-8 text-center text-red-600 shadow">
        No se encontró el usuario.
      </p>
    );
  }

  return <UserForm key={user._id} user={user} />;
}