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
  IndianRupee,
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
    roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT', 'CLIENT'],
  },
  {
    title: 'Users',
    icon: Users,
    roles: ['SUPERADMIN'],
    subItems: [
      {
        title: 'Admins',
        url: '/users/admins',
        roles: ['SUPERADMIN'],
      },
      {
        title: 'Masters',
        url: '/users/MASTERs',
        roles: ['SUPERADMIN'],
      },
      {
        title: 'Super Agents',
        url: '/users/SUPERAGENTs',
        roles: ['SUPERADMIN'],
      },
      {
        title: 'Agents',
        url: '/users/agents',
        roles: ['SUPERADMIN'],
      },
      {
        title: 'Clients',
        url: '/users/CLIENTs',
        roles: ['SUPERADMIN'],
      },
    ],
  },
  {
    title: 'Master Details',
    icon: UserCog,
    roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT'],
    subItems: [
      {
        title: 'Admin',
        url: '/MASTER-details/admin',
        roles: ['SUPERADMIN'],
      },
      {
        title: 'Master',
        url: '/MASTER-details/MASTER',
        roles: ['SUPERADMIN',"ADMIN"],
      },
      {
        title: 'Super Agent Master',
        url: '/MASTER-details/super-agent',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER'],
      },
      {
        title: 'Agent Master',
        url: '/MASTER-details/agent',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT'],
      },
      {
        title: 'Client Master',
        url: '/MASTER-details/CLIENT',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT'],
      },
    ],
  },
  {
    title: 'Sports Betting',
    icon: Trophy,
    roles: ['SUPERADMIN', 'ADMIN','MASTER','SUPERAGENT','AGENT','CLIENT'],
    subItems: [
      {
        title: 'Active Games',
        url: '/sports-betting/active',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT','CLIENT'],
      },
      {
        title: 'Finished Games',
        url: '/sports-betting/finished',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT','CLIENT'],
      },
    ],
  },
  {
    title: 'Casino',
    icon: Dices,
    roles: ['SUPERADMIN', 'ADMIN','MASTER','SUPERAGENT','AGENT','CLIENT'],
    subItems: [
      {
        title: 'Inplay Casino',
        url: '/casino/inplay',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT','CLIENT'],
      },
      {
        title: 'Completed Casino',
        url: '/casino/completed',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT','CLIENT'],
      },
      {
        title: 'Casino Details',
        url: '/casino/details',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT','CLIENT'],
      },
    ],
  },
  {
    title: 'Matka',
    icon: Gamepad2,
    roles: ['SUPERADMIN', 'ADMIN'],
    subItems: [
      {
        title: 'Inplay Matka',
        url: '/matka/inplay',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT','CLIENT'],
      },
    ],
  },
  {
    title: 'Ledger',
    icon: FileText,
    roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT', 'CLIENT'],
    subItems: [
      {
        title: 'Profit/Loss',
        url: '/ledger/profit-loss',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER' , 'SUPERAGENT', 'AGENT', 'CLIENT'],
      },
      {
        title: 'My Ledger',
        url: '/ledger/my-ledger',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT', 'CLIENT'],
      },
      {
        title: 'Admin Ledger',
        url: '/ledger/admin',
        roles: ['SUPERADMIN',],
      },
      {
        title: 'Master Ledger',
        url: '/ledger/MASTER',
        roles: ['SUPERADMIN', 'ADMIN'],
      },
      {
        title: 'Super Agent Ledger',
        url: '/ledger/super-agent',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER'],
      },
      {
        title: 'Agent Ledger',
        url: '/ledger/agent',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT'],
      },
      {
        title: 'Client Ledger',
        url: '/ledger/CLIENT',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT'],
      },
    ],
  },
  {
    title: 'Cash Transaction',
    icon: IndianRupee,
    roles: ['SUPERADMIN', 'ADMIN', 'SUPERAGENT', 'AGENT'],
    subItems: [
      {
        title: '(AD) Debit/Credit Entry',
        url: '/cash-transaction/admin',
        roles: ['SUPERADMIN'],
      },
      {
        title: '(M) Debit/Credit Entry',
        url: '/cash-transaction/MASTER',
        roles: ['SUPERADMIN'],
      },
      {
        title: '(C) Debit/Credit Entry',
        url: '/cash-transaction/CLIENT',
        roles: ['SUPERADMIN', 'ADMIN', 'SUPERAGENT', 'AGENT'],
      },
      {
        title: '(A) Debit/Credit Entry',
        url: '/cash-transaction/agent',
        roles: ['SUPERADMIN', 'ADMIN', 'SUPERAGENT'],
      },
      {
        title: '(SA) Debit/Credit Entry',
        url: '/cash-transaction/super-agent',
        roles: ['SUPERADMIN', 'ADMIN','MASTER'],
      },
    ],
  },
  {
    title: 'Reports',
    icon: BarChart3,
    roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT'],
    subItems: [
      {
        title: 'Login Report',
        url: '/reports/login',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT'],
      },
      {
        title: 'Secure Code Report',
        url: '/reports/secure-code',
        roles: ['SUPERADMIN', 'ADMIN','MASTER','SUPERAGENT','AGENT'],
      },
    ],
  },
  {
    title: 'Comm. Report',
    url: '/comm-report',
    icon: Receipt,
    roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT','CLIENT'],
  },
  {
    title: 'User Management',
    icon: Shield,
    roles: ['SUPERADMIN'],
    subItems: [
      {
        title: 'Role Assignment',
        url: '/user-management/roles',
        roles: ['SUPERADMIN'],
      },
      {
        title: 'Permission Settings',
        url: '/user-management/permissions',
        roles: ['SUPERADMIN'],
      },
      {
        title: 'Audit Logs',
        url: '/user-management/audit',
        roles: ['SUPERADMIN'],
      },
    ],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT', 'CLIENT'],
    subItems: [
      {
        title: 'Change Password',
        url: '/change-password',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT', 'CLIENT'],
      },
      {
        title: 'General Settings',
        url: '/settings',
        roles: ['SUPERADMIN', 'ADMIN', 'MASTER', 'SUPERAGENT', 'AGENT', 'CLIENT'],
      },
    ],
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
    setOpenMenus(prev => {
      const isCurrentlyOpen = prev[title];
      // Close all menus first, then open the clicked one if it was closed
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      newState[title] = !isCurrentlyOpen;
      return newState;
    });
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
