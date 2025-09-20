import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Search, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import ProductCard from '../components/ProductCard';
import { products, categories, brands, filters } from '../data/mockData';

const ProductListPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    // Filter by flash sale or new products from URL params
    if (searchParams.get('sale') === 'true') {
      filtered = filtered.filter(product => product.isFlashSale);
    }
    if (searchParams.get('new') === 'true') {
      filtered = filtered.filter(product => product.isNew);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, selectedColors, selectedSizes, minRating, sortBy, searchParams]);

  const handleBrandChange = (brand, checked) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleColorChange = (color, checked) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };

  const handleSizeChange = (size, checked) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange([0, 5000]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setMinRating(0);
    setSortBy('name');
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory,
    ...selectedBrands,
    ...selectedColors,
    ...selectedSizes,
    minRating > 0 ? 'rating' : null,
    priceRange[0] > 0 || priceRange[1] < 5000 ? 'price' : null
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Search</h3>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 bg-gray-900 border-gray-700 focus:border-purple-500 text-gray-100"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all-categories"
              checked={!selectedCategory}
              onCheckedChange={() => setSelectedCategory('')}
            />
            <label htmlFor="all-categories" className="text-gray-300 cursor-pointer">
              All Categories
            </label>
          </div>
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox
                id={cat.slug}
                checked={selectedCategory === cat.slug}
                onCheckedChange={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
              />
              <label htmlFor={cat.slug} className="text-gray-300 cursor-pointer">
                {cat.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000}
            step={50}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Brands</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={brand.name}
                checked={selectedBrands.includes(brand.name)}
                onCheckedChange={(checked) => handleBrandChange(brand.name, checked)}
              />
              <label htmlFor={brand.name} className="text-gray-300 cursor-pointer">
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Colors</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {filters.colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={color}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => handleColorChange(color, checked)}
              />
              <label htmlFor={color} className="text-gray-300 cursor-pointer">
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Sizes</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {filters.sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={size}
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) => handleSizeChange(size, checked)}
              />
              <label htmlFor={size} className="text-gray-300 cursor-pointer">
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Minimum Rating</h3>
        <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
          <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="0">Any Rating</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="4.5">4.5+ Stars</SelectItem>
            <SelectItem value="4.7">4.7+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button onClick={clearFilters} variant="outline" className="w-full border-gray-700 text-gray-300">
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {category ? categories.find(c => c.slug === category)?.name : 'All Products'}
          </h1>
          <p className="text-gray-400">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-gray-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border border-gray-700 rounded">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-purple-600' : 'text-gray-400'}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-purple-600' : 'text-gray-400'}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filter */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden border-gray-700 text-gray-300">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-purple-600 text-white">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gray-950 border-gray-800">
              <SheetHeader>
                <SheetTitle className="text-white">Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <Card className="bg-gray-900 border-gray-700 sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Badge className="bg-purple-600 text-white">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <FilterContent />
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters} className="bg-purple-600 hover:bg-purple-700">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;