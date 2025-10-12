import { apiService } from './api.service';
import { API_ENDPOINTS } from '@/config/api';
import { User } from '@/types';

interface VerifyCredentialsResponse {
  message: string;
  userId: string;
}

interface VerifyOtpResponse {
  token: string;
  user: User;
}

export const authService = {
  async verifyCredentials(userId: string, password: string) {
    return apiService.post<VerifyCredentialsResponse>(
      API_ENDPOINTS.AUTH.VERIFY_CREDENTIALS,
      { userId, password },
      false
    );
  },

  async verifyOtp(userId: string, password: string, otp: string) {
    return apiService.post<VerifyOtpResponse>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      { userId, password, otp },
      false
    );
  },

  async resendOtp(userId: string, password: string) {
    return apiService.post<{ message: string }>(
      API_ENDPOINTS.AUTH.RESEND_OTP,
      { userId, password },
      false
    );
  },

  async logout() {
    return apiService.post<{ message: string }>(
      API_ENDPOINTS.AUTH.LOGOUT,
      {},
      true
    );
  },
};
