
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  User, 
  Settings,
  AlertCircle,
  FileText,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/'
    },
    {
      name: 'Patient Profiles',
      icon: <User className="h-5 w-5" />,
      path: '/patients'
    },
    {
      name: 'Risk Management',
      icon: <AlertCircle className="h-5 w-5" />,
      path: '/risk'
    },
    {
      name: 'Compliance',
      icon: <FileText className="h-5 w-5" />,
      path: '/compliance'
    },
    {
      name: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/settings'
    }
  ];

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-hdep-primary text-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-opacity-20 border-white">
        {!collapsed && (
          <div className="font-bold text-xl">HDEP Dashboard</div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-hdep-primary/80"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>
      
      <div className="flex flex-col flex-grow py-4">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className={cn(
              'justify-start my-1 mx-2 text-white hover:bg-white/20',
              location.pathname === item.path && 'bg-white/20',
              collapsed ? 'px-0 justify-center' : ''
            )}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {!collapsed && <span className="ml-2">{item.name}</span>}
          </Button>
        ))}
      </div>
      
      <div className="p-4 border-t border-opacity-20 border-white">
        {!collapsed && (
          <div className="text-xs text-white/70 mb-2">Healthcare Data Ethics Protocol v1.0</div>
        )}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="ml-2">
              <div className="text-sm font-medium">Dr. Smith</div>
              <div className="text-xs text-white/70">Administrator</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
