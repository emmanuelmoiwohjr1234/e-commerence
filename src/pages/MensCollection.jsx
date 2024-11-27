import React, { useState } from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';
import ProductCard from '../components/Products/ProductCard';

const mensProducts = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: '/images/products/tshirt-1.jpg',
    category: 'T-Shirts',
    rating: 4.5,
    reviews: 128,
    inStock: true
  },
  {
    id: 2,
    name: 'Slim Fit Jeans',
    price: 79.99,
    image: '/images/products/jeans.jpg',
    category: 'Jeans',
    rating: 4.3,
    reviews: 95,
    inStock: true
  },
  {
    id: 3,
    name: 'Leather Jacket',
    price: 199.99,
    originalPrice: 249.99,
    image: '/images/products/jacket.jpg',
    category: 'Jackets',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    discount: 20
  },
  {
    id: 4,
    name: 'Cotton Polo Shirt',
    price: 39.99,
    image: '/images/products/polo.jpg',
    category: 'T-Shirts',
    rating: 4.2,
    reviews: 78,
    inStock: true
  },
  {
    id: 5,
    name: 'Casual Sneakers',
    price: 89.99,
    image: '/images/products/sneakers.jpg',
    category: 'Shoes',
    rating: 4.6,
    reviews: 214,
    inStock: true
  },
  {
    id: 6,
    name: 'Formal Dress Shirt',
    price: 69.99,
    originalPrice: 89.99,
    image: '/images/products/dress-shirt.jpg',
    category: 'Shirts',
    rating: 4.4,
    reviews: 167,
    inStock: true,
    discount: 22
  }
];

const categories = [
  'All',
  'T-Shirts',
  'Shirts',
  'Jeans',
  'Jackets',
  'Shoes',
  'Accessories'
];

const MensCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = mensProducts
    .filter(product => 
      selectedCategory === 'All' || product.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Men's Collection</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn btn-secondary flex items-center space-x-2"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input appearance-none pr-8"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
            <FaSort className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`md:w-64 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="input w-24"
                  min="0"
                  max={priceRange[1]}
                />
                <span>to</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="input w-24"
                  min={priceRange[0]}
                />
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MensCollection;
