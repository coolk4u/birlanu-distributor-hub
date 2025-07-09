
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Building2,
  User,
  Bell,
  Users,
  Warehouse,
  ClipboardCheck,
  UserCircle,
  ChevronRight
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const distributorName = localStorage.getItem('distributorName') || 'Distributor';

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('distributorAuth');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('distributorAuth');
    localStorage.removeItem('distributorName');
    localStorage.removeItem('cart');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Product Catalog', path: '/catalog' },
    { icon: Users, label: 'My Retailers', path: '/retailers' },
    { icon: Warehouse, label: 'Stock Management', path: '/stocks' },
    { icon: ClipboardCheck, label: 'GRN Management', path: '/grn' },
    { icon: ShoppingCart, label: 'My Cart', path: '/cart' },
    { icon: FileText, label: 'Orders', path: '/orders' },
    { icon: UserCircle, label: 'My Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } flex flex-col shadow-sm`}>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-xl text-gray-900">Birlanu</h1>
                <p className="text-sm text-gray-500">Distributor Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
                    isActivePath(item.path)
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-5 w-5 flex-shrink-0 ${
                      isActivePath(item.path) ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    {sidebarOpen && (
                      <span className={`font-medium ${
                        isActivePath(item.path) ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {item.label}
                      </span>
                    )}
                  </div>
                  {sidebarOpen && isActivePath(item.path) && (
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{distributorName}</p>
                <p className="text-xs text-gray-500">Active Distributor</p>
              </div>
            )}
          </div>
          
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className={`w-full text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 ${
              sidebarOpen ? 'justify-start' : 'justify-center'
            }`}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {menuItems.find(item => isActivePath(item.path))?.label || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-500">Welcome back, {distributorName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
