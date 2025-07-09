
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Trash2, 
  Package,
  IndianRupee,
  Percent,
  CheckCircle
} from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  mrp: number;
  quantity: number;
  unit: string;
  minOrderQty: number;
  schemes: string[];
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    if (newQuantity < item.minOrderQty) {
      toast({
        title: "Minimum Order Quantity",
        description: `Minimum order quantity is ${item.minOrderQty} ${item.unit}`,
        variant: "destructive"
      });
      return;
    }

    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const newCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(newCart);
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
    toast({
      title: "Item Removed",
      description: "Product removed from cart",
    });
  };

  const clearCart = () => {
    updateCart([]);
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart",
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateMRPTotal = () => {
    return cart.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  };

  const calculateSavings = () => {
    return calculateMRPTotal() - calculateSubtotal();
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.18); // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before placing order",
        variant: "destructive"
      });
      return;
    }

    // Mock order placement
    const orderId = 'ORD-' + Date.now().toString().slice(-6);
    
    // Save order to localStorage (in real app, would send to backend)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: cart,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      status: 'Processing'
    };
    orders.unshift(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    
    toast({
      title: "Order Placed Successfully!",
      description: `Order ${orderId} has been placed and is being processed`,
    });
    
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Button onClick={() => navigate('/catalog')} className="bg-blue-600 hover:bg-blue-700">
            Browse Products
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">{cart.length} items in your cart</p>
          </div>
          <Button variant="outline" onClick={clearCart} className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 w-16 h-16 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{item.mrp}</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                        </Badge>
                      </div>
                      
                      {/* Schemes */}
                      <div className="mt-2 space-y-1">
                        {item.schemes.slice(0, 2).map((scheme, index) => (
                          <div key={index} className="flex items-center text-xs text-orange-600">
                            <Percent className="h-3 w-3 mr-1" />
                            {scheme}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity - item.minOrderQty)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity + item.minOrderQty)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                        <p className="text-sm text-gray-500">{item.quantity} {item.unit}</p>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>You Save</span>
                    <span>-₹{calculateSavings()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST (18%)</span>
                    <span>₹{calculateTax()}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={placeOrder} className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Place Order
                </Button>
              </CardContent>
            </Card>

            {/* Offers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Offers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center text-orange-700">
                    <Percent className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Festival Special: Extra 5% off on orders above ₹5000</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center text-blue-700">
                    <IndianRupee className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Free delivery on orders above ₹2000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Cart;
