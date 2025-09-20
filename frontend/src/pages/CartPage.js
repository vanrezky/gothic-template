import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Truck, Tag, ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { toast } = useToast();

  const subtotal = getCartTotal();
  const shipping = subtotal > 1000 ? 0 : 49.99;
  const tax = subtotal * 0.08; // 8% tax
  const discount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
  const total = subtotal + shipping + tax - discount;

  const freeShippingThreshold = 1000;
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  const availableCoupons = [
    { code: 'GOTHIC10', discount: 10, description: '10% off your order' },
    { code: 'SHADOW15', discount: 15, description: '15% off orders over $1500' },
    { code: 'NEWUSER20', discount: 20, description: '20% off for new customers' }
  ];

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      if (coupon.code === 'SHADOW15' && subtotal < 1500) {
        toast({
          title: "Coupon not applicable",
          description: "This coupon requires a minimum order of $1500.",
          variant: "destructive"
        });
        return;
      }
      setAppliedCoupon(coupon);
      setCouponCode('');
      toast({
        title: "Coupon applied!",
        description: `${coupon.description} has been applied to your order.`,
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "Please check your coupon code and try again.",
        variant: "destructive"
      });
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast({
      title: "Coupon removed",
      description: "The coupon has been removed from your order.",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">
            Looks like you haven't added anything to your cart yet. Start exploring our gothic collection!
          </p>
          <Link to="/products">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="h-8 w-8 text-purple-400" />
        <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
        <Badge className="bg-purple-600 text-white">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Free Shipping Progress */}
          {remainingForFreeShipping > 0 && (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-medium">
                    Add ${remainingForFreeShipping.toFixed(2)} more for free shipping!
                  </span>
                </div>
                <Progress value={freeShippingProgress} className="h-2" />
              </CardContent>
            </Card>
          )}

          {cartItems.map((item) => (
            <Card key={item.id} className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link
                          to={`/product/${item.product.id}`}
                          className="text-white font-semibold hover:text-purple-400 transition-colors"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-purple-400 text-sm">{item.product.brand}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-400"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Variants */}
                    <div className="flex gap-4 text-sm text-gray-400 mb-3">
                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                      {item.selectedColor && (
                        <span>Color: {item.selectedColor}</span>
                      )}
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">
                          ${item.product.price.toFixed(2)}
                        </span>
                        {item.product.oldPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ${item.product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0 border-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-white">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0 border-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="mt-3 text-right">
                      <span className="text-white font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Clear Cart */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-red-400"
              onClick={clearCart}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
            <Link to="/products">
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                Continue Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Coupon */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Tag className="h-5 w-5" />
                Promo Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!appliedCoupon ? (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button onClick={applyCoupon} className="bg-purple-600 hover:bg-purple-700">
                    Apply
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-700 rounded">
                  <div>
                    <span className="text-green-400 font-medium">{appliedCoupon.code}</span>
                    <p className="text-green-300 text-sm">{appliedCoupon.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-400 hover:text-green-300"
                    onClick={removeCoupon}
                  >
                    Remove
                  </Button>
                </div>
              )}

              {/* Available Coupons */}
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">Available coupons:</p>
                {availableCoupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="flex items-center justify-between p-2 bg-gray-800 rounded text-sm cursor-pointer hover:bg-gray-750"
                    onClick={() => setCouponCode(coupon.code)}
                  >
                    <span className="text-purple-400 font-mono">{coupon.code}</span>
                    <span className="text-gray-400">{coupon.discount}% off</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-400' : ''}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between text-gray-400">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <Separator />
              
              <div className="flex justify-between text-white font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 h-12 text-white">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-4 pt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>🔒</span>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <h3 className="text-white font-semibold mb-3">Shipping Information</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-purple-400" />
                  <span>Free shipping on orders over $1000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📦</span>
                  <span>Standard delivery: 5-7 business days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Express delivery: 2-3 business days (+$29.99)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Bottom CTA - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-800 p-4 lg:hidden z-40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-bold">Total: ${total.toFixed(2)}</span>
          <Badge className="bg-purple-600 text-white">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </Badge>
        </div>
        <Link to="/checkout">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;