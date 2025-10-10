import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Lock, User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call to verify credentials and send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('OTP sent successfully!');
      setStep('otp');
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

    setLoading(true);

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Proceed with actual login
      await login(userId, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCredentials = () => {
    setStep('credentials');
    setOtp('');
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
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">User ID: {userId}</p>
                  <p className="text-xs text-muted-foreground">Credentials verified</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleEditCredentials}
                  className="text-xs"
                >
                  Edit
                </Button>
              </div>

              <div className="space-y-3">
                <Label htmlFor="otp" className="text-sm font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Enter OTP
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
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
                  Didn't receive the code? <button type="button" className="text-primary hover:underline font-medium">Resend</button>
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold"
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'Verifying OTP...' : 'Submit OTP'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
