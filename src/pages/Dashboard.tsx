
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  IndianRupee,
  Users,
  Target,
  Award,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: 'Monthly Sales',
      value: '₹2,45,680',
      change: '+12.5%',
      trend: 'up',
      icon: IndianRupee,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Orders Placed',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Product Categories',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'Achievement Rate',
      value: '87%',
      change: '-3.1%',
      trend: 'down',
      icon: Target,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const recentOrders = [
    { id: 'ORD-001', date: '2024-01-15', amount: '₹15,450', status: 'Delivered' },
    { id: 'ORD-002', date: '2024-01-14', amount: '₹8,200', status: 'Processing' },
    { id: 'ORD-003', date: '2024-01-13', amount: '₹22,100', status: 'Shipped' },
    { id: 'ORD-004', date: '2024-01-12', amount: '₹5,800', status: 'Pending' },
  ];

  const topProducts = [
    { name: 'Birlanu Premium Tea 500g', sold: 245, revenue: '₹49,000' },
    { name: 'Birlanu Instant Coffee 200g', sold: 189, revenue: '₹37,800' },
    { name: 'Birlanu Masala Chai 250g', sold: 156, revenue: '₹31,200' },
    { name: 'Birlanu Green Tea 100g', sold: 134, revenue: '₹26,800' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h1>
              <p className="text-blue-100">Track your sales, manage orders, and grow your business with Birlanu</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/catalog')}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Browse Catalog
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${metric.color}`}>
                    <metric.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Orders
                <Button variant="ghost" size="sm" onClick={() => navigate('/orders')}>
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{order.amount}</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Top Selling Products
                <Button variant="ghost" size="sm" onClick={() => navigate('/catalog')}>
                  View Catalog
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sold} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{product.revenue}</p>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className="h-20 flex flex-col space-y-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/catalog')}
              >
                <Package className="h-6 w-6" />
                <span>Browse Products</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col space-y-2"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-6 w-6" />
                <span>View Cart</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col space-y-2"
                onClick={() => navigate('/orders')}
              >
                <Calendar className="h-6 w-6" />
                <span>Order History</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
