
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  IndianRupee,
  Calendar
} from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';

interface Order {
  id: string;
  date: string;
  items: any[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Pending';
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Sample orders for demo
      const sampleOrders: Order[] = [
        {
          id: 'ORD-001234',
          date: '2024-01-15',
          items: [
            { name: 'Birlanu Premium Tea 500g', quantity: 24, price: 200, unit: 'boxes' },
            { name: 'Birlanu Instant Coffee 200g', quantity: 12, price: 180, unit: 'jars' }
          ],
          subtotal: 7000,
          tax: 1260,
          total: 8260,
          status: 'Delivered'
        },
        {
          id: 'ORD-001235',
          date: '2024-01-14',
          items: [
            { name: 'Birlanu Masala Chai 250g', quantity: 30, price: 160, unit: 'packets' }
          ],
          subtotal: 4800,
          tax: 864,
          total: 5664,
          status: 'Shipped'
        },
        {
          id: 'ORD-001236',
          date: '2024-01-13',
          items: [
            { name: 'Birlanu Green Tea 100g', quantity: 20, price: 120, unit: 'boxes' },
            { name: 'Birlanu Special Blend 300g', quantity: 18, price: 220, unit: 'packs' }
          ],
          subtotal: 6360,
          tax: 1145,
          total: 7505,
          status: 'Processing'
        }
      ];
      setOrders(sampleOrders);
      localStorage.setItem('orders', JSON.stringify(sampleOrders));
    }
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Clock className="h-4 w-4" />;
      case 'Shipped':
        return <Truck className="h-4 w-4" />;
      case 'Delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <FileText className="h-4 w-4 mr-1" />
              {orders.length} Total Orders
            </Badge>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {order.date}
                          </div>
                          <div className="flex items-center">
                            <Package className="h-4 w-4 mr-1" />
                            {order.items.length} items
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={`${getStatusColor(order.status)} mb-2`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </Badge>
                      <div className="text-lg font-bold text-gray-900">₹{order.total}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Order Items */}
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.quantity} {item.unit} × ₹{item.price}</p>
                        </div>
                        <div className="font-medium text-gray-900">
                          ₹{item.quantity * item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Summary */}
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Subtotal</p>
                        <p className="font-medium">₹{order.subtotal}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">GST (18%)</p>
                        <p className="font-medium">₹{order.tax}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Total</p>
                        <p className="font-bold text-lg">₹{order.total}</p>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Orders;
