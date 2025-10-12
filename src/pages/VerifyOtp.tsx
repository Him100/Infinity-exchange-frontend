import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ShieldCheck, Clock } from 'lucide-react';
import { toast } from 'sonner';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(90);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, password } = location.state || {};

  // Redirect to login if no credentials
  useEffect(() => {
    if (!userId || !password) {
      toast.error('Session expired. Please login again.');
      navigate('/login');
    }
  }, [userId, password, navigate]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      toast.error('OTP expired. Please request a new one.');
      setOtp('');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timer]);

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    if (timer === 0) {
      toast.error('OTP has expired. Please request a new one.');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.verifyOtp(userId, password, otp);
      
      if (response.error) {
        toast.error(response.error);
        setOtp('');
        return;
      }

      if (response.data) {
        // Stop the timer
        setIsTimerActive(false);
        
        // Login with JWT token and user data from backend
        login(response.data.token, response.data.user);
        toast.success(`Login successful! Welcome ${response.data.user.role}.`);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await authService.resendOtp(userId, password);
      
      if (response.error) {
        toast.error(response.error);
        return;
      }
      
      toast.success(response.data?.message || 'New OTP sent successfully!');
      setTimer(90);
      setIsTimerActive(true);
      setOtp('');
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-card">
      <Card className="w-full max-w-md shadow-2xl border-border/50 backdrop-blur-sm">
        <CardHeader className="space-y-3">
          <div className="flex justify-center mb-2">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-4xl">B</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Verify OTP
          </CardTitle>
          <CardDescription className="text-center text-base">
            Enter the 6-digit OTP sent to your registered device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="otp" className="text-sm font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Enter OTP
                </Label>
                <div className={`flex items-center gap-1.5 text-sm font-semibold ${
                  timer <= 30 ? 'text-destructive' : 'text-primary'
                }`}>
                  <Clock className="h-4 w-4" />
                  {formatTime(timer)}
                </div>
              </div>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={timer === 0}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Didn't receive the code? <button 
                  type="button" 
                  onClick={handleResendOtp}
                  className="text-primary hover:underline font-medium"
                  disabled={timer > 60}
                >
                  Resend
                </button>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold mt-6"
              disabled={loading || otp.length !== 6 || timer === 0}
            >
              {loading ? 'Verifying OTP...' : 'Submit OTP'}
            </Button>
            
            {timer === 0 && (
              <p className="text-sm text-center text-destructive font-medium">
                OTP expired. Please click resend to get a new code.
              </p>
            )}

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 text-base font-semibold"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
