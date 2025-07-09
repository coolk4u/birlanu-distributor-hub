import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Star,
  Package,
  Percent,
  Gift,
  Zap
} from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  image: string;
  rating: number;
  inStock: boolean;
  description: string;
  schemes: string[];
  minOrderQty: number;
  unit: string;
}

const ProductCatalog = () => {
  const [products] = useState<Product[]>([
    {
      id: 'BC001',
      name: 'Birlanu Portland Cement - Grade 53',
      category: 'Cement',
      price: 420,
      mrp: 450,
      image: '/api/placeholder/300/200',
      rating: 4.8,
      inStock: true,
      description: 'High quality Portland cement Grade 53 for superior construction strength',
      schemes: ['Buy 100 Bags Get 5 Free', 'Bulk Order 12% Discount'],
      minOrderQty: 50,
      unit: 'bags'
    },
    {
      id: 'BS001',
      name: 'Birlanu TMT Steel Bars - Fe500D',
      category: 'Steel',
      price: 65,
      mrp: 70,
      image: '/api/placeholder/300/200',
      rating: 4.7,
      inStock: true,
      description: 'High strength TMT steel bars with superior bendability and weldability',
      schemes: ['Contractor Special Rate', '10MT+ Free Transport'],
      minOrderQty: 1000,
      unit: 'kg'
    },
    {
      id: 'BT001',
      name: 'Birlanu Ceramic Floor Tiles - 600x600mm',
      category: 'Tiles',
      price: 45,
      mrp: 55,
      image: '/api/placeholder/300/200',
      rating: 4.5,
      inStock: true,
      description: 'Premium ceramic tiles with anti-skid surface and water resistance',
      schemes: ['Designer Collection 15% Off', 'Buy 100 Get 10 Free'],
      minOrderQty: 100,
      unit: 'pieces'
    },
    {
      id: 'BB001',
      name: 'Birlanu Red Clay Bricks - Class A',
      category: 'Bricks',
      price: 8,
      mrp: 10,
      image: '/api/placeholder/300/200',
      rating: 4.4,
      inStock: true,
      description: 'High quality fired clay bricks with excellent compressive strength',
      schemes: ['Monsoon Special 20% Off', 'Bulk Purchase Discount'],
      minOrderQty: 1000,
      unit: 'pieces'
    },
    {
      id: 'BP001',
      name: 'Birlanu Ready Mix Concrete - M25 Grade',
      category: 'Concrete',
      price: 4500,
      mrp: 5000,
      image: '/api/placeholder/300/200',
      rating: 4.6,
      inStock: true,
      description: 'Premium ready mix concrete with consistent quality and strength',
      schemes: ['Volume Discount Available', 'Free Quality Testing'],
      minOrderQty: 10,
      unit: 'cubic meters'
    },
    {
      id: 'BA001',
      name: 'Birlanu M-Sand (Manufactured Sand)',
      category: 'Aggregates',
      price: 1200,
      mrp: 1400,
      image: '/api/placeholder/300/200',
      rating: 4.3,
      inStock: true,
      description: 'High quality manufactured sand for concrete and plastering work',
      schemes: ['Rainy Season Special', 'Free Home Delivery 5km'],
      minOrderQty: 20,
      unit: 'tons'
    },
    {
      id: 'BW001',
      name: 'Birlanu Exterior Wall Paint - Weather Shield',
      category: 'Paints',
      price: 180,
      mrp: 220,
      image: '/api/placeholder/300/200',
      rating: 4.2,
      inStock: false,
      description: 'Weather resistant exterior paint with 7-year warranty',
      schemes: ['Painter Scheme 25% Off', 'Color Mixing Free'],
      minOrderQty: 50,
      unit: 'liters'
    },
    {
      id: 'BF001',
      name: 'Birlanu AAC Blocks - 600x200x100mm',
      category: 'Blocks',
      price: 3800,
      mrp: 4200,
      image: '/api/placeholder/300/200',
      rating: 4.5,
      inStock: true,
      description: 'Lightweight AAC blocks for faster construction and better insulation',
      schemes: ['New Launch 15% Discount', 'Free Technical Support'],
      minOrderQty: 1,
      unit: 'cubic meters'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product, quantity: number = product.minOrderQty) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    toast({
      title: "Added to Cart",
      description: `${product.name} (${quantity} ${product.unit}) added to cart`,
    });
  };

  const getDiscountPercentage = (price: number, mrp: number) => {
    return Math.round(((mrp - price) / mrp) * 100);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Construction Materials Catalog</h1>
            <p className="text-gray-600">Browse and order from our extensive construction materials range</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Package className="h-4 w-4 mr-1" />
              {filteredProducts.length} Products
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <ShoppingCart className="h-4 w-4 mr-1" />
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Items in Cart
            </Badge>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search construction materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex space-x-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Construction Industry Schemes Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-2 rounded-full">
                <Gift className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Construction Season Special Offers!</h3>
                <p className="text-sm text-orange-100">Contractor schemes • Bulk discounts • Free transport • Quality guarantee</p>
              </div>
            </div>
            <Zap className="h-8 w-8 text-yellow-300" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    {getDiscountPercentage(product.price, product.mrp)}% OFF
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.rating})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{product.mrp}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Min: {product.minOrderQty} {product.unit}
                    </Badge>
                  </div>
                  
                  {/* Schemes */}
                  <div className="space-y-1">
                    {product.schemes.map((scheme, index) => (
                      <div key={index} className="flex items-center text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                        <Percent className="h-3 w-3 mr-1" />
                        {scheme}
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="w-full"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add {product.minOrderQty} {product.unit} to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductCatalog;
