export type UserRole = 'superadmin' | 'admin' | 'master' | 'superagent' | 'agent' | 'client';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
