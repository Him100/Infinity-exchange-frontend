import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { AuthService } from '@/services/auth.service';

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
  });

  const authService = new AuthService();

  useEffect(() => {
    // Check for saved auth state
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        token: savedToken,
      });
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    setAuthState({
      user,
      isAuthenticated: true,
      token,
    });
  };

  const logout = async () => {
    try {
      // Call the backend logout API first
      const response = await authService.logout();

      // If backend logout fails, throw an error to prevent local logout
      if (response.error) {
        throw new Error(response.error);
      }

      // Only clear local storage if backend logout succeeds
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setAuthState({
        user: null,
        isAuthenticated: false,
        token: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error; // Re-throw to let the UI handle the error
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
