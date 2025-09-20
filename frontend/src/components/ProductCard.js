import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.title} ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <Card className="group bg-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="relative h-48 bg-gray-800 overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}
            <img
              src={product.image}
              alt={product.title}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
            
            {/* Discount Badge */}
            {product.discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                -{product.discount}%
              </Badge>
            )}

            {/* New Badge */}
            {product.isNew && (
              <Badge className="absolute top-2 right-2 bg-purple-600 text-white">
                New
              </Badge>
            )}

            {/* Quick Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current text-red-400' : ''}`} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            {/* Brand */}
            <p className="text-xs text-purple-400 mb-1 uppercase tracking-wide">
              {product.brand}
            </p>

            {/* Title */}
            <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-500'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded ${
                product.stock > 10 
                  ? 'bg-green-900 text-green-300' 
                  : product.stock > 0 
                    ? 'bg-yellow-900 text-yellow-300'
                    : 'bg-red-900 text-red-300'
              }`}>
                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
              </span>
              
              {product.isFlashSale && (
                <Badge className="bg-red-600 text-white text-xs">
                  Flash Sale
                </Badge>
              )}
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;