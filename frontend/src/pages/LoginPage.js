import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { useToast } from '../hooks/use-toast';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false,
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please check your password confirmation.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      if (!formData.agreeToTerms) {
        toast({
          title: "Terms required",
          description: "Please accept the terms and conditions.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      // Mock successful authentication
      localStorage.setItem('gothic-auth', JSON.stringify({
        user: {
          email: formData.email,
          name: isLogin ? 'Gothic User' : `${formData.firstName} ${formData.lastName}`,
          isAuthenticated: true
        },
        token: 'mock-jwt-token'
      }));

      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "You've been signed in successfully." : "Your gothic tech account has been created.",
      });

      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    toast({
      title: `${provider} Login`,
      description: "Social login integration coming soon...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20" />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3 text-2xl font-bold mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-red-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">G</span>
            </div>
            <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent gothic-heading">
              GothicTech
            </span>
          </Link>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Welcome back to the shadows' : 'Join the gothic revolution'}
          </p>
        </div>

        {/* Login/Register Card */}
        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-white gothic-heading">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <p className="text-gray-400 text-sm">
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Join thousands of gothic tech enthusiasts'
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => handleSocialLogin('Google')}
              >
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => handleSocialLogin('GitHub')}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-gray-900 px-3 text-gray-400 text-sm">or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields - Register Only */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                        placeholder="John"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                        placeholder="Doe"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-7 w-7 p-0 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirm Password - Register Only */}
              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                      placeholder="••••••••"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="flex items-center justify-between">
                {isLogin ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                      />
                      <Label htmlFor="rememberMe" className="text-gray-300 text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300 text-sm">
                      Forgot password?
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-gray-300 text-sm">
                      I agree to the{' '}
                      <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                        Terms & Conditions
                      </Link>
                    </Label>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Toggle Login/Register */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="ghost"
                  className="text-purple-400 hover:text-purple-300 p-0 ml-1 h-auto font-normal"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({
                      email: '',
                      password: '',
                      confirmPassword: '',
                      firstName: '',
                      lastName: '',
                      rememberMe: false,
                      agreeToTerms: false
                    });
                  }}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Button>
              </p>
            </div>

            {/* Security Notice */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-500 text-xs">
                🔒 Your data is protected with 256-bit SSL encryption
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Store */}
        <div className="text-center">
          <Link to="/" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
            ← Back to GothicTech Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;