import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

interface AuthResponse {
  token?: string;
  user?: any;
  message?: string;
  error?: string;
  requiresOtp?: boolean;
}

export class AuthService {
  async verifyCredentials(userId: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.VERIFY_CREDENTIALS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return { 
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
          requiresOtp: data.requiresOtp || false
        };
      }

      return data;
    } catch (error) {
      console.error('Auth service error:', error);
      return { error: 'Network error. Please check if the server is running.' };
    }
  }

  async verifyOtp(userId: string, password: string, otp: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.VERIFY_OTP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          password,
          otp
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return { 
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
          requiresOtp: data.requiresOtp || false
        };
      }

      return data;
    } catch (error) {
      console.error('OTP verification error:', error);
      return { error: 'Network error during OTP verification.' };
    }
  }

  async changePassword({ currentPassword, newPassword, confirmPassword }: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<AuthResponse> {
    try {
      // Get the auth token from localStorage or auth context
      const token = localStorage.getItem('token');

      if (!token) {
        return { error: 'No authentication token found. Please log in again.' };
      }

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.CHANGE_PASSWORD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword
        })
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        return {
          error: `Invalid response from server (HTTP ${response.status})`
        };
      }

      if (!response.ok) {
        return {
          error: data.error || `HTTP ${response.status}: ${response.statusText}`
        };
      }

      return data;
    } catch (error) {
      console.error('Change password error:', error);
      return { error: 'Network error during password change.' };
    }
  }
}
