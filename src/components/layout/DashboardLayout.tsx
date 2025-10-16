import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Navbar } from './Navbar';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className={`flex-1 flex flex-col w-full`}>
          <Navbar />
          <main className={`flex-1 mt-16 p-4 md:p-6 lg:p-8`}>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
