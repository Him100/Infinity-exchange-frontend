import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Lock, User, ShieldCheck, Clock } from 'lucide-react';
import { toast } from 'sonner';

export const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(90);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

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

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.verifyCredentials(userId, password);
      
      if (response.error) {
        toast.error(response.error);
        return;
      }
      
      toast.success(response.data?.message || 'OTP sent successfully! Valid for 90 seconds.');
      setStep('otp');
      setTimer(90);
      setIsTimerActive(true);
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  const handleEditCredentials = () => {
    setStep('credentials');
    setOtp('');
    setTimer(90);
    setIsTimerActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md shadow-2xl border-border/50 backdrop-blur-sm">
      <CardHeader className="space-y-3">
        <div className="flex justify-center mb-2">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-4xl">B</span>
          </div>
        </div>
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          Welcome to BetPro
        </CardTitle>
        <CardDescription className="text-center text-base">
          {step === 'credentials' 
            ? 'Enter your credentials to continue' 
            : 'Enter the OTP sent to your registered device'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="userId" className="text-sm font-semibold">User ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="pl-10 h-11 text-base"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 text-base"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold mt-6"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Continue'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="userId-readonly" className="text-sm font-semibold">User ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="userId-readonly"
                  type="text"
                  value={userId}
                  className="pl-10 h-11 text-base bg-muted/50"
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-readonly" className="text-sm font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password-readonly"
                  type="password"
                  value={password}
                  className="pl-10 h-11 text-base bg-muted/50"
                  readOnly
                />
              </div>
            </div>

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
          </form>
        )}
      </CardContent>
    </Card>
  );
};
