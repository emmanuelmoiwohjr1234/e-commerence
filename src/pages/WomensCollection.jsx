import React, { useState } from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';
import ProductCard from '../components/Products/ProductCard';

const categories = ['All', 'Dresses', 'Tops', 'Jeans', 'Accessories', 'Shoes'];

const womensProducts = [
  {
    id: 1,
    name: 'Floral Summer Dress',
    description: 'Beautiful floral print dress perfect for summer days. Made with lightweight, breathable fabric.',
    price: 79.99,
    category: 'Dresses',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    searchQuery: 'floral summer dress fashion'
  },
  {
    id: 2,
    name: 'High-Waist Skinny Jeans',
    description: 'Classic high-waist skinny jeans with a perfect fit. Made with premium stretch denim.',
    price: 69.99,
    category: 'Jeans',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    searchQuery: 'womens high waist jeans fashion'
  },
  {
    id: 3,
    name: 'Leather Crossbody Bag',
    description: 'Elegant leather crossbody bag with adjustable strap. Perfect for everyday use.',
    price: 89.99,
    originalPrice: 119.99,
    category: 'Accessories',
    rating: 4.8,
    reviews: 96,
    inStock: true,
    discount: 25,
    searchQuery: 'leather crossbody bag fashion'
  },
  {
    id: 4,
    name: 'Silk Blouse',
    description: 'Luxurious silk blouse with a relaxed fit. Perfect for both casual and formal occasions.',
    price: 59.99,
    category: 'Tops',
    rating: 4.4,
    reviews: 85,
    inStock: true,
    searchQuery: 'silk blouse fashion women'
  },
  {
    id: 5,
    name: 'Gold Pendant Necklace',
    description: 'Elegant gold-plated pendant necklace with delicate chain. A timeless accessory.',
    price: 159.99,
    category: 'Accessories',
    rating: 4.9,
    reviews: 74,
    inStock: true,
    searchQuery: 'gold pendant necklace jewelry'
  },
  {
    id: 6,
    name: 'Leather Ankle Boots',
    description: 'Classic leather ankle boots with a comfortable heel. Perfect for any season.',
    price: 129.99,
    category: 'Shoes',
    rating: 4.6,
    reviews: 112,
    inStock: true,
    searchQuery: 'leather ankle boots women fashion'
  }
];

const WomensCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = womensProducts
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
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Women's Collection</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
          <div className="relative">
            <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg appearance-none hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
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
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
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
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-24 px-3 py-2 border rounded-lg"
                  min="0"
                  max={priceRange[1]}
                />
                <span>to</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                  className="w-24 px-3 py-2 border rounded-lg"
                  min={priceRange[0]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
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

export default WomensCollection;
