interface AuthState {
  user: string | null;
  ready: boolean; // false mientras lee localStorage al cargar
  login: (user: string, password: string) => boolean;
  logout: () => void;
}

export type { AuthState };