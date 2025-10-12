import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.verifyCredentials(userId, password);
      
      if (response.error) {
        toast.error(response.error);
        return;
      }
      
      // Check if user can login directly (candidate without OTP)
      if (response.data?.token && response.data?.user) {
        // Direct login without OTP
        login(response.data.token, response.data.user);
        toast.success(`Login successful! Welcome ${response.data.user.role}.`);
        navigate('/dashboard');
      } else {
        // OTP required for other roles
        toast.success(response.data?.message || 'OTP sent successfully! Valid for 90 seconds.');
        navigate('/verify-otp', { 
          state: { userId, password }
        });
      }
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
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
          Enter your credentials to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
