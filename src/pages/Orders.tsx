// orders.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Package, Truck, CheckCircle, Clock, IndianRupee, Calendar } from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Pending';
}

const dummyOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-12-15',
    items: [
      { name: 'Premium Cotton T-Shirt', quantity: 2, price: 799, unit: 'pieces' },
      { name: 'Denim Jeans', quantity: 1, price: 1499, unit: 'pair' },
      { name: 'Leather Belt', quantity: 1, price: 499, unit: 'piece' }
    ],
    subtotal: 3596,
    tax: 647,
    total: 4243,
    status: 'Delivered'
  },
  {
    id: 'ORD-002',
    date: '2024-12-18',
    items: [
      { name: 'Wireless Earbuds', quantity: 1, price: 2499, unit: 'pair' },
      { name: 'Phone Case', quantity: 1, price: 299, unit: 'piece' },
      { name: 'Screen Protector', quantity: 2, price: 199, unit: 'pieces' }
    ],
    subtotal: 3196,
    tax: 575,
    total: 3771,
    status: 'Shipped'
  },
  {
    id: 'ORD-003',
    date: '2024-12-20',
    items: [
      { name: 'Coffee Maker', quantity: 1, price: 3499, unit: 'unit' },
      { name: 'Coffee Beans (500g)', quantity: 2, price: 599, unit: 'pack' }
    ],
    subtotal: 4697,
    tax: 845,
    total: 5542,
    status: 'Processing'
  },
  {
    id: 'ORD-004',
    date: '2024-12-22',
    items: [
      { name: 'Running Shoes', quantity: 1, price: 2899, unit: 'pair' },
      { name: 'Sports Socks', quantity: 3, price: 199, unit: 'pairs' }
    ],
    subtotal: 3496,
    tax: 629,
    total: 4125,
    status: 'Pending'
  },
  {
    id: 'ORD-005',
    date: '2024-12-24',
    items: [
      { name: 'Laptop Backpack', quantity: 1, price: 1899, unit: 'piece' },
      { name: 'USB-C Cable', quantity: 2, price: 299, unit: 'pieces' },
      { name: 'Power Bank', quantity: 1, price: 1599, unit: 'piece' }
    ],
    subtotal: 4096,
    tax: 737,
    total: 4833,
    status: 'Delivered'
  }
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setOrders(dummyOrders);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing': return <Clock className="h-4 w-4" />;
      case 'Shipped': return <Truck className="h-4 w-4" />;
      case 'Delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
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

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
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
                      <div className="text-lg font-bold text-gray-900">₹{order.total.toLocaleString()}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.quantity} {item.unit} × ₹{item.price}
                          </p>
                        </div>
                        <div className="font-medium text-gray-900">
                          ₹{(item.quantity * item.price).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Subtotal</p>
                        <p className="font-medium">₹{order.subtotal.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">GST (18%)</p>
                        <p className="font-medium">₹{order.tax.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Total</p>
                        <p className="font-bold text-lg">₹{order.total.toLocaleString()}</p>
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
