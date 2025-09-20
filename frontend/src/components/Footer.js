import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { categories } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-900 to-red-900 rounded flex items-center justify-center">
                <span className="text-white font-black text-sm">G</span>
              </div>
              <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                GothicTech
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Embrace the darkness with our premium collection of gothic-themed electronics. 
              Where technology meets elegance in shadows.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@gothictech.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Shadow Street, Dark City</span>
              </div>
            </div>
          </div>

          {/* Featured Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products/${category.slug}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Warranty
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Join the Shadows</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get exclusive offers and new product updates.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-900 border-gray-700 focus:border-purple-500 text-gray-100 text-sm"
                />
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 px-4">
                  Subscribe
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400 p-2">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400 p-2">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400 p-2">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400 p-2">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 GothicTech. All rights reserved. Embrace the darkness.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-purple-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;