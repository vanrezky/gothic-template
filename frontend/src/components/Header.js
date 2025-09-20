import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useCart } from '../context/CartContext';
import { categories } from '../data/mockData';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/products' },
    ...categories.map(cat => ({ name: cat.name, href: `/products/${cat.slug}` })),
    { name: 'Orders', href: '/orders' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm text-gray-400 border-b border-gray-800">
          <div>Free shipping on orders over $1000</div>
          <div className="flex items-center gap-6">
            <span>24/7 Support</span>
            <span>Track Your Order</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-900 to-red-900 rounded flex items-center justify-center">
              <span className="text-white font-black text-sm">G</span>
            </div>
            <span className="hidden sm:block bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
              GothicTech
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 bg-gray-900 border-gray-700 focus:border-purple-500 text-gray-100 placeholder-gray-400"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 h-7 w-7 p-0 bg-purple-600 hover:bg-purple-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search - Mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:text-white">
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-gray-950 border-gray-800">
                <form onSubmit={handleSearch} className="mt-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search for electronics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-10 bg-gray-900 border-gray-700 focus:border-purple-500 text-gray-100"
                    />
                    <Button type="submit" size="sm" className="absolute right-1 top-1 h-7 w-7 p-0 bg-purple-600">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </SheetContent>
            </Sheet>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Account */}
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white">
                <ShoppingCart className="h-5 w-5" />
                {getCartItemsCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-600 hover:bg-red-700">
                    {getCartItemsCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-gray-950 border-gray-800">
                <div className="flex items-center justify-between py-4 border-b border-gray-800">
                  <span className="text-lg font-semibold">Menu</span>
                </div>
                <nav className="flex flex-col gap-4 mt-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 py-3 border-t border-gray-800">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;