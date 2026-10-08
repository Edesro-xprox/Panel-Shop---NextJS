// Login simulado. Solo para ver el panel sin backend.
// Después lo reemplazas por una llamada a tu API MERN (ej: POST /api/login).

export interface SessionUser {
  user: string;
}

const SESSION_KEY = "nextshop-admin";

export function signInMock(user: string, password: string): boolean {
  // Acepta cualquier usuario/clave no vacíos para que puedas probar.
  // Ejemplo: admin / 123456
  if (!user.trim() || !password.trim()) return false;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user }));
  return true;
}

export function signOutMock(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function readSessionMock(): SessionUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}
