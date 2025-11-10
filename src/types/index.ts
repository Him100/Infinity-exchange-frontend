export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'MASTER' | 'SUPERAGENT' | 'AGENT' | 'CLIENT';

export interface User {
  id: number;
  username: string;
  email: string;
  userRole: UserRole;  // Changed from user_role to userRole to match backend
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
