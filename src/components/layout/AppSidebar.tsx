import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Briefcase,
  UserCheck,
  Trophy,
  Settings,
  BarChart3,
  Wallet,
  FileText,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    roles: ['superadmin', 'admin', 'master', 'superagent', 'agent', 'client'],
  },
  {
    title: 'Users Management',
    url: '/users',
    icon: Users,
    roles: ['superadmin', 'admin'],
  },
  {
    title: 'Masters',
    url: '/masters',
    icon: UserCog,
    roles: ['superadmin', 'admin'],
  },
  {
    title: 'Super Agents',
    url: '/superagents',
    icon: Briefcase,
    roles: ['superadmin', 'admin', 'master'],
  },
  {
    title: 'Agents',
    url: '/agents',
    icon: UserCheck,
    roles: ['superadmin', 'admin', 'master', 'superagent'],
  },
  {
    title: 'Clients',
    url: '/clients',
    icon: Trophy,
    roles: ['superadmin', 'admin', 'master', 'superagent', 'agent'],
  },
  {
    title: 'Bets',
    url: '/bets',
    icon: FileText,
    roles: ['superadmin', 'admin', 'master', 'superagent', 'agent', 'client'],
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: BarChart3,
    roles: ['superadmin', 'admin', 'master', 'superagent', 'agent'],
  },
  {
    title: 'Wallet',
    url: '/wallet',
    icon: Wallet,
    roles: ['superadmin', 'admin', 'master', 'superagent', 'agent', 'client'],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    roles: ['superadmin', 'admin', 'master', 'superagent', 'agent', 'client'],
  },
];

export const AppSidebar = () => {
  const { user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const filteredMenuItems = menuItems.filter(item =>
    user?.role ? item.roles.includes(user.role) : false
  );

  return (
    <Sidebar collapsible="icon" className={collapsed ? 'w-14' : 'w-64'}>
      <SidebarContent className="mt-16">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'px-2' : ''}>
            {!collapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'hover:bg-accent/50'
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
