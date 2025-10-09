import { NavLink } from 'react-router-dom';
import { useState } from 'react';
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
  ChevronDown,
  DollarSign,
  Gamepad2,
  Dices,
  Shield,
  Receipt,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface SubMenuItem {
  title: string;
  url: string;
  roles: UserRole[];
}

interface MenuItem {
  title: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    roles: ['superadmin', 'admin', 'master', 'superagent', 'agent', 'client'],
  },
  {
    title: 'Users',
    icon: Users,
    roles: ['superadmin'],
    subItems: [
      {
        title: 'Admins',
        url: '/users/admins',
        roles: ['superadmin'],
      },
      {
        title: 'Masters',
        url: '/users/masters',
        roles: ['superadmin'],
      },
      {
        title: 'Super Agents',
        url: '/users/superagents',
        roles: ['superadmin'],
      },
      {
        title: 'Agents',
        url: '/users/agents',
        roles: ['superadmin'],
      },
      {
        title: 'Clients',
        url: '/users/clients',
        roles: ['superadmin'],
      },
    ],
  },
  {
    title: 'Master Details',
    icon: UserCog,
    roles: ['superadmin', 'admin', 'master', 'superagent', 'agent'],
    subItems: [
      {
        title: 'Admin',
        url: '/master-details/admin',
        roles: ['superadmin'],
      },
      {
        title: 'Master',
        url: '/master-details/master',
        roles: ['superadmin'],
      },
      {
        title: 'Super Agent Master',
        url: '/master-details/super-agent',
        roles: ['superadmin', 'admin'],
      },
      {
        title: 'Agent Master',
        url: '/master-details/agent',
        roles: ['superadmin', 'admin', 'master', 'superagent'],
      },
      {
        title: 'Client Master',
        url: '/master-details/client',
        roles: ['superadmin', 'admin', 'master', 'superagent', 'agent'],
      },
    ],
  },
  {
    title: 'Sports Betting',
    icon: Trophy,
    roles: ['superadmin', 'admin'],
    subItems: [
      {
        title: 'Active Games',
        url: '/sports-betting/active',
        roles: ['superadmin', 'admin'],
      },
      {
        title: 'Finished Games',
        url: '/sports-betting/finished',
        roles: ['superadmin', 'admin'],
      },
    ],
  },
  {
    title: 'Casino',
    icon: Dices,
    roles: ['superadmin', 'admin'],
    subItems: [
      {
        title: 'Inplay Casino',
        url: '/casino/inplay',
        roles: ['superadmin', 'admin'],
      },
      {
        title: 'Completed Casino',
        url: '/casino/completed',
        roles: ['superadmin', 'admin'],
      },
      {
        title: 'Casino Details',
        url: '/casino/details',
        roles: ['superadmin', 'admin'],
      },
    ],
  },
  {
    title: 'Matka',
    icon: Gamepad2,
    roles: ['superadmin', 'admin'],
    subItems: [
      {
        title: 'Inplay Matka',
        url: '/matka/inplay',
        roles: ['superadmin', 'admin'],
      },
    ],
  },
  {
    title: 'Ledger',
    icon: FileText,
    roles: ['superadmin', 'admin', 'master', 'superagent', 'agent', 'client'],
    subItems: [
      {
        title: 'Profit/Loss',
        url: '/ledger/profit-loss',
        roles: ['superadmin', 'admin', 'master'],
      },
      {
        title: 'My Ledger',
        url: '/ledger/my-ledger',
        roles: ['superadmin', 'admin', 'master', 'superagent', 'agent', 'client'],
      },
      {
        title: 'Admin Ledger',
        url: '/ledger/admin',
        roles: ['superadmin'],
      },
      {
        title: 'Master Ledger',
        url: '/ledger/master',
        roles: ['superadmin'],
      },
      {
        title: 'Super Agent Ledger',
        url: '/ledger/super-agent',
        roles: ['superadmin', 'admin'],
      },
      {
        title: 'Agent Ledger',
        url: '/ledger/agent',
        roles: ['superadmin', 'admin', 'master', 'superagent'],
      },
      {
        title: 'Client Ledger',
        url: '/ledger/client',
        roles: ['superadmin', 'admin', 'master', 'superagent', 'agent'],
      },
    ],
  },
  {
    title: 'Cash Transaction',
    icon: DollarSign,
    roles: ['superadmin', 'admin', 'superagent', 'agent'],
    subItems: [
      {
        title: '(AD) Debit/Credit Entry',
        url: '/cash-transaction/admin',
        roles: ['superadmin'],
      },
      {
        title: '(M) Debit/Credit Entry',
        url: '/cash-transaction/master',
        roles: ['superadmin'],
      },
      {
        title: '(C) Debit/Credit Entry',
        url: '/cash-transaction/client',
        roles: ['superadmin', 'admin', 'superagent', 'agent'],
      },
      {
        title: '(A) Debit/Credit Entry',
        url: '/cash-transaction/agent',
        roles: ['superadmin', 'admin', 'superagent'],
      },
      {
        title: '(SA) Debit/Credit Entry',
        url: '/cash-transaction/super-agent',
        roles: ['superadmin', 'admin'],
      },
    ],
  },
  {
    title: 'Reports',
    icon: BarChart3,
    roles: ['superadmin', 'admin', 'master', 'superagent', 'agent'],
    subItems: [
      {
        title: 'Login Report',
        url: '/reports/login',
        roles: ['superadmin', 'admin', 'master', 'superagent', 'agent'],
      },
      {
        title: 'Secure Code Report',
        url: '/reports/secure-code',
        roles: ['superadmin', 'admin'],
      },
    ],
  },
  {
    title: 'Comm. Report',
    url: '/comm-report',
    icon: Receipt,
    roles: ['superadmin', 'admin', 'master'],
  },
  {
    title: 'User Management',
    icon: Shield,
    roles: ['superadmin'],
    subItems: [
      {
        title: 'Role Assignment',
        url: '/user-management/roles',
        roles: ['superadmin'],
      },
      {
        title: 'Permission Settings',
        url: '/user-management/permissions',
        roles: ['superadmin'],
      },
      {
        title: 'Audit Logs',
        url: '/user-management/audit',
        roles: ['superadmin'],
      },
    ],
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
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const filteredMenuItems = menuItems.filter(item =>
    user?.role ? item.roles.includes(user.role) : false
  );

  const filterSubItems = (subItems: SubMenuItem[] | undefined) => {
    if (!subItems) return [];
    return subItems.filter(subItem =>
      user?.role ? subItem.roles.includes(user.role) : false
    );
  };

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Sidebar collapsible="icon" className={collapsed ? 'w-14' : 'w-64'}>
      <SidebarContent className="mt-16">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'px-2' : ''}>
            {!collapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => {
                const filteredSubs = filterSubItems(item.subItems);
                const hasSubItems = filteredSubs.length > 0;

                if (hasSubItems) {
                  return (
                    <Collapsible
                      key={item.title}
                      open={openMenus[item.title]}
                      onOpenChange={() => toggleMenu(item.title)}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={collapsed ? 'justify-center' : ''}
                          >
                            <item.icon className="h-5 w-5" />
                            {!collapsed && (
                              <>
                                <span>{item.title}</span>
                                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              </>
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        {!collapsed && (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {filteredSubs.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <NavLink
                                      to={subItem.url}
                                      className={({ isActive }) =>
                                        isActive
                                          ? 'bg-accent text-accent-foreground font-medium'
                                          : 'hover:bg-accent/50'
                                      }
                                    >
                                      <span>{subItem.title}</span>
                                    </NavLink>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url || '#'}
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
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
