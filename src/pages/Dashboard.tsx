import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Your dashboard with role: <span className="capitalize font-semibold">{user?.role}</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
