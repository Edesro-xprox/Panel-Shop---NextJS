"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import userService from "@/services/userService";
import type { User, UserPayload } from "@/types/user";

export function UserForm({ user }: { user?: User | null }) {
  const router = useRouter();
  const isEditing = Boolean(user);
  const [username, setUsername] = useState(user?.user ?? "");
  const [changePassword, setChangePassword] = useState(!isEditing);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const inputClass =
    "w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600";

  const handlePasswordToggle = (checked: boolean) => {
    setChangePassword(checked);
    setPassword("");
    setConfirmPassword("");
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveError("");

    if (changePassword && password !== confirmPassword) {
      setSaveError("Las contraseñas no coinciden.");
      return;
    }

    const payload: UserPayload = { user: username.trim() };
    if (changePassword) payload.password = password;

    setSaving(true);
    try {
      if (user) {
        console.log(typeof(user._id));
        console.log(payload);
        await userService.updateUser(user._id, payload);
      } else {
        await userService.createUser(payload);
      }
      router.push("/usuarios");
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al guardar el usuario.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-bold">
        {isEditing ? "Editar usuario" : "Nuevo usuario"}
      </h2>

      <label htmlFor="username" className="mb-1 block text-sm font-medium">
        Nombre de usuario
      </label>
      <input
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className={`${inputClass} mb-4`}
        autoComplete="username"
        required
      />

      {isEditing && (
        <label className="mb-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={changePassword}
            onChange={(event) => handlePasswordToggle(event.target.checked)}
            className="size-4 accent-amber-600"
          />
          Cambiar contraseña
        </label>
      )}

      {changePassword && (
        <>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Nueva contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`${inputClass} mb-4`}
            autoComplete="new-password"
            required
          />

          <label htmlFor="confirm-password" className="mb-1 block text-sm font-medium">
            Confirmar contraseña
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className={`${inputClass} mb-4`}
            autoComplete="new-password"
            required
          />
        </>
      )}

      {saveError && (
        <p role="alert" className="mb-3 text-sm text-red-600">
          {saveError}
        </p>
      )}

      <div className="mt-2 flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-amber-600 px-5 py-2 font-semibold text-white hover:bg-amber-700 disabled:cursor-wait disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/usuarios")}
          className="rounded-lg bg-zinc-200 px-5 py-2 hover:bg-zinc-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}