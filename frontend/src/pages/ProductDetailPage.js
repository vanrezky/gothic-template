import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Heart, Share2, Truck, Shield, RefreshCw, Minus, Plus, ShoppingCart, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';
import { products } from '../data/mockData';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const similarProducts = products.filter(p => 
    p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  useEffect(() => {
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
        <Link to="/products">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    // Navigate to checkout would go here
    toast({
      title: "Redirecting to checkout",
      description: "Taking you to secure checkout...",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-purple-400">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-purple-400">Products</Link>
          <span>/</span>
          <Link to={`/products/${product.category}`} className="hover:text-purple-400 capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-300">{product.title}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative group">
            <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.discount > 0 && (
                  <Badge className="bg-red-600 text-white">
                    -{product.discount}%
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-purple-600 text-white">
                    New
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-16 h-16 rounded border-2 overflow-hidden ${
                      index === currentImageIndex ? 'border-purple-500' : 'border-gray-700'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand */}
          <div className="text-purple-400 text-sm uppercase tracking-wider">
            {product.brand}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-500'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-xl text-gray-500 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
            {product.discount > 0 && (
              <Badge className="bg-red-600 text-white">
                Save ${(product.oldPrice - product.price).toFixed(2)}
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          <div className={`inline-flex items-center px-3 py-1 rounded text-sm ${
            product.stock > 10 
              ? 'bg-green-900 text-green-300' 
              : product.stock > 0 
                ? 'bg-yellow-900 text-yellow-300'
                : 'bg-red-900 text-red-300'
          }`}>
            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
          </div>

          {/* Options */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-3">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    size="sm"
                    className={selectedSize === size ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-700 text-gray-300'}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-3">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'default' : 'outline'}
                    size="sm"
                    className={selectedColor === color ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-700 text-gray-300'}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-700 rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 text-white">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-gray-400 text-sm">
                Total: ${(product.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-purple-600 hover:bg-purple-700 h-12"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700 h-12"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Buy Now
            </Button>
          </div>

          {/* Secondary Actions */}
          <div className="flex justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`text-gray-400 hover:text-white ${isWishlisted ? 'text-red-400' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Truck className="h-5 w-5 text-purple-400" />
              <span>Free shipping over $1000</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <RefreshCw className="h-5 w-5 text-purple-400" />
              <span>30-day returns</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="h-5 w-5 text-purple-400" />
              <span>2-year warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Card className="bg-gray-900 border-gray-700 mb-16">
        <CardContent className="p-6">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="description" className="data-[state=active]:bg-purple-600">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="data-[state=active]:bg-purple-600">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="shipping" className="data-[state=active]:bg-purple-600">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Shipping Information</h4>
                  <p className="text-gray-400">Free shipping on orders over $1000. Standard delivery takes 5-7 business days.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-white font-semibold mb-2">Returns Policy</h4>
                  <p className="text-gray-400">30-day return policy. Items must be in original condition with all packaging.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-white font-semibold mb-2">Warranty</h4>
                  <p className="text-gray-400">2-year manufacturer warranty covering defects and malfunctions.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom CTA - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-800 p-4 md:hidden z-40">
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            className="flex-1 bg-red-600 hover:bg-red-700"
            onClick={handleBuyNow}
            disabled={product.stock === 0}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;