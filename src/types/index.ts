export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'MASTER' | 'SUPERAGENT' | 'AGENT' | 'CLIENT';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  otp?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
