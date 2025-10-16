// src/components/auth/VerifyOtp.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import logo from '@/assets/logo.png';

export const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get credentials from navigation state
  const { userId, password } = location.state || {};

  const handleBack = () => {
    navigate('/login');
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) {
      toast.error('Session expired. Please login again.');
      return;
    }

    setLoading(true);
    try {
      const response = await new AuthService().verifyOtp(userId, password, otp);      
      if (response.error) {
        toast.error(response.error);
        return;
      }

      if (response.token && response.user) {
        login(response.token, response.user);
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid response from server');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-2xl border-border/50 backdrop-blur-sm">
        <CardHeader className="space-y-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="absolute top-4 left-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex justify-center mb-2">
            <img src={logo} alt="Infinity Exchange" className="h-20 w-auto" />
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            Enter OTP
          </CardTitle>
          <CardDescription className="text-center text-base">
            Enter the 6-digit OTP sent to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold"
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};