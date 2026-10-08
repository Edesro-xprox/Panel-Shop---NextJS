"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signOutMock,
  signInMock,
  readSessionMock,
} from "@/lib/auth-mock";
import { AuthState } from "@/types/auth";

// Contexto simple para saber si el admin está logueado.
// Así cualquier página del panel puede leer `user` o llamar a `logout()`.

const AuthContext = createContext<AuthState>({
  user: null,
  ready: false,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser(readSessionMock()?.user ?? null);
    setReady(true);
  }, []);

  const login = (username: string, password: string) => {
    const ok = signInMock(username, password);
    if (ok) setUser(username);
    return ok;
  };

  const logout = () => {
    signOutMock();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
