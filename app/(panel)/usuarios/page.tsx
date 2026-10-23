"use client";

import { useEffect, useMemo, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import { UserFilters } from "@/components/users/UserFilters";
import { UserTable } from "@/components/users/UserTable";
import userService from "@/services/userService";
import type { User } from "@/types/user";
import useUser from "@/hooks/useUser";

export default function UsuariosPage() {
  const { search, setSearch, loadError, loading, filteredUsers } = useUser();

  return (
    <div className="rounded bg-white p-5">
      <h1 className="mb-4 text-xl font-bold">Usuarios</h1>
      <UserFilters search={search} onSearchChange={setSearch} />
      {loadError ? (
        <p role="alert" className="rounded-xl bg-white p-8 text-center text-red-600 shadow">
          {loadError}
        </p>
      ) : loading ? (
        <LoadingOverlay open={loading} />
      ) : (
        <UserTable users={filteredUsers} />
      )}
    </div>
  );
}
