import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, MapPin, Lock, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState('shipping');
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    // Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    // Options
    shippingMethod: 'standard',
    saveAddress: false,
    newsletter: false
  });

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const shippingCost = formData.shippingMethod === 'express' ? 29.99 : subtotal > 1000 ? 0 : 49.99;
  const total = subtotal + tax + shippingCost;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 'shipping':
        return formData.firstName && formData.lastName && formData.email && 
               formData.address && formData.city && formData.state && formData.zipCode;
      case 'payment':
        return formData.cardNumber && formData.expiryDate && formData.cvv && formData.cardName;
      default:
        return true;
    }
  };

  const handleStepNavigation = (step) => {
    if (step === 'payment' && !validateStep('shipping')) {
      toast({
        title: "Please complete shipping information",
        description: "All shipping fields are required.",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(step);
  };

  const handlePlaceOrder = async () => {
    if (!validateStep('shipping') || !validateStep('payment')) {
      toast({
        title: "Please complete all required fields",
        description: "Check your shipping and payment information.",
        variant: "destructive"
      });
      return;
    }

    // Simulate order processing
    toast({
      title: "Processing your order...",
      description: "Please wait while we process your payment.",
    });

    // Simulate API call
    setTimeout(() => {
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "Your order has been confirmed. You'll receive an email shortly.",
      });
      navigate('/orders');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
        <Link to="/products">
          <Button className="bg-purple-600 hover:bg-purple-700">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/cart">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Accordion type="single" value={currentStep} onValueChange={setCurrentStep} className="space-y-4">
            {/* Shipping Address */}
            <AccordionItem value="shipping" className="border border-gray-700 rounded-lg bg-gray-900">
              <AccordionTrigger 
                className="px-6 py-4 hover:no-underline"
                onClick={() => handleStepNavigation('shipping')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    validateStep('shipping') ? 'bg-green-600' : 'bg-gray-700'
                  }`}>
                    {validateStep('shipping') ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <MapPin className="h-5 w-5 text-gray-300" />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold">Shipping Address</h3>
                    <p className="text-gray-400 text-sm">Where should we deliver your order?</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-gray-300">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-gray-300">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="apartment" className="text-gray-300">Apartment, Suite, etc.</Label>
                    <Input
                      id="apartment"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-gray-300">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gray-300">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-gray-300">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="saveAddress"
                    checked={formData.saveAddress}
                    onCheckedChange={(checked) => handleInputChange('saveAddress', checked)}
                  />
                  <Label htmlFor="saveAddress" className="text-gray-300">
                    Save this address for future orders
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Shipping Method */}
            <AccordionItem value="shipping-method" className="border border-gray-700 rounded-lg bg-gray-900">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-gray-300" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold">Shipping Method</h3>
                    <p className="text-gray-400 text-sm">Choose your preferred delivery speed</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <RadioGroup
                  value={formData.shippingMethod}
                  onValueChange={(value) => handleInputChange('shippingMethod', value)}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <div>
                        <Label htmlFor="standard" className="text-white font-medium">
                          Standard Delivery
                        </Label>
                        <p className="text-gray-400 text-sm">5-7 business days</p>
                      </div>
                    </div>
                    <span className="text-white font-semibold">
                      {subtotal > 1000 ? 'Free' : '$49.99'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label htmlFor="express" className="text-white font-medium">
                          Express Delivery
                        </Label>
                        <p className="text-gray-400 text-sm">2-3 business days</p>
                      </div>
                    </div>
                    <span className="text-white font-semibold">$29.99</span>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            {/* Payment */}
            <AccordionItem value="payment" className="border border-gray-700 rounded-lg bg-gray-900">
              <AccordionTrigger 
                className="px-6 py-4 hover:no-underline"
                onClick={() => handleStepNavigation('payment')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    validateStep('payment') ? 'bg-green-600' : 'bg-gray-700'
                  }`}>
                    {validateStep('payment') ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <CreditCard className="h-5 w-5 text-gray-300" />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold">Payment Information</h3>
                    <p className="text-gray-400 text-sm">Secure payment processing</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName" className="text-gray-300">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber" className="text-gray-300">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-gray-300">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-gray-300">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Newsletter Signup */}
          <Card className="bg-gray-900 border-gray-700 mt-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                />
                <Label htmlFor="newsletter" className="text-gray-300">
                  Subscribe to our newsletter for exclusive gothic deals
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="bg-gray-900 border-gray-700 sticky top-24">
            <CardHeader>
              <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {item.product.title}
                      </p>
                      <div className="text-xs text-gray-400">
                        {item.selectedSize && <span>Size: {item.selectedSize} </span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-gray-400 text-sm">Qty: {item.quantity}</span>
                        <span className="text-white font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-400' : ''}>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 h-12 text-white"
                disabled={!validateStep('shipping') || !validateStep('payment')}
              >
                <Lock className="h-5 w-5 mr-2" />
                Place Order
              </Button>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-4 pt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>🔒</span>
                  <span>256-bit SSL</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🛡️</span>
                  <span>Secure Payment</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;