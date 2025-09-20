import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Flame, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import ProductCard from '../components/ProductCard';
import { heroSlides, brands, flashSaleProducts, newProducts } from '../data/mockData';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="space-y-16">
      {/* Hero Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                    {slide.title}
                  </span>
                </h1>
                <h2 className="text-xl md:text-2xl mb-4 text-gray-200">{slide.subtitle}</h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">{slide.description}</p>
                <Link to={slide.link}>
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white px-8 py-3">
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-purple-500' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Brands Strip */}
      <section className="py-8 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden">
            <div className="flex items-center justify-center md:justify-between gap-8 animate-marquee">
              {brands.concat(brands).map((brand, index) => (
                <div key={`${brand.id}-${index}`} className="flex-shrink-0">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Flame className="h-8 w-8 text-red-500" />
            <h2 className="text-3xl font-bold text-white">Flash Sale</h2>
            <Badge className="bg-red-600 text-white">Limited Time</Badge>
          </div>
          <Link to="/products?sale=true">
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <Card className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-colors flex items-center justify-center cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-300 font-medium">View More</p>
              <p className="text-gray-500 text-sm">Flash Sale Items</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* New Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-white">New Arrivals</h2>
            <Badge className="bg-purple-600 text-white">Fresh</Badge>
          </div>
          <Link to="/products?new=true">
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Full-width Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&h=400&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Gaming in the <span className="text-red-400">Shadows</span>
            </h3>
            <p className="text-gray-200 mb-6 text-lg">
              Discover our exclusive collection of high-performance gaming gear designed for the gothic aesthetic.
            </p>
            <Link to="/products/computers">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                Explore Gaming Rigs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Collection</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Handpicked electronics that embody the perfect fusion of cutting-edge technology and gothic elegance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flashSaleProducts.concat(newProducts.slice(0, 2)).map((product) => (
            <ProductCard key={`featured-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;