import { useAuth } from '@/contexts/AuthContext';
import SuperAdminDashboard from '@/features/superadmin/pages/SuperAdminDashboard';
import AdminDashboard from '@/features/admin/pages/AdminDashboard';
import MasterDashboard from '@/features/master/pages/MasterDashboard';
import SuperAgentDashboard from '@/features/superagent/pages/SuperAgentDashboard';
import AgentDashboard from '@/features/agent/pages/AgentDashboard';
import ClientDashboard from '@/features/client/pages/ClientDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'superadmin':
        return <SuperAdminDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'master':
        return <MasterDashboard />;
      case 'superagent':
        return <SuperAgentDashboard />;
      case 'agent':
        return <AgentDashboard />;
      case 'client':
        return <ClientDashboard />;
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome to your betting dashboard
              </p>
            </div>
          </div>
        );
    }
  };

  return renderDashboard();
};

export default Dashboard;
