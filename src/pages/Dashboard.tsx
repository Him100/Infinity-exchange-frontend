import { useAuth } from '@/contexts/AuthContext';
import SuperAdminDashboard from '@/features/superadmin/pages/SuperAdminDashboard';
import AdminDashboard from '@/features/admin/pages/AdminDashboard';
import MasterDashboard from '@/features/master/pages/MasterDashboard';
import SuperAgentDashboard from '@/features/superagent/pages/SuperAgentDashboard';
import AgentDashboard from '@/features/agent/pages/AgentDashboard';
import ClientDashboard from '@/features/client/pages/ClientDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  console.log('Dashboard - User:', user);
  console.log('Dashboard - User role:', user?.userRole);

  const renderDashboard = () => {
    console.log('Rendering dashboard for role:', user?.userRole);
    switch (user?.userRole) {
      case 'SUPERADMIN':
        return <SuperAdminDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      case 'MASTER':
        return <MasterDashboard />;
      case 'SUPERAGENT':
        return <SuperAgentDashboard />;
      case 'AGENT':
        return <AgentDashboard />;
      case 'CLIENT':
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
