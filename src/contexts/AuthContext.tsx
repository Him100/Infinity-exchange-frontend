import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, UserRole } from '@/types';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
  });

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

  const login = async (username: string, password: string) => {
    // TODO: Replace with actual API call
    // Simulating login for demo purposes
    const mockUser: User = {
      id: '1',
      username,
      email: `${username}@betting.app`,
      role: 'superadmin' as UserRole, // Assigned superadmin role
      createdAt: new Date(),
    };

    const mockToken = 'mock-jwt-token';

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', mockToken);

    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      token: mockToken,
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      token: null,
    });
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
