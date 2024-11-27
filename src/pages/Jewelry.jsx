import React, { useState } from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';
import ProductCard from '../components/Products/ProductCard';

const jewelryProducts = [
  {
    id: 1,
    name: 'Diamond Engagement Ring',
    price: 2999.99,
    image: '/images/products/ring-1.jpg',
    category: 'Rings',
    rating: 4.9,
    reviews: 86,
    inStock: true,
    description: '1.5 carat diamond set in 18K white gold'
  },
  {
    id: 2,
    name: 'Pearl Necklace',
    price: 599.99,
    originalPrice: 799.99,
    image: '/images/products/necklace-1.jpg',
    category: 'Necklaces',
    rating: 4.7,
    reviews: 124,
    inStock: true,
    discount: 25,
    description: 'Freshwater cultured pearls with sterling silver clasp'
  },
  {
    id: 3,
    name: 'Sapphire Earrings',
    price: 899.99,
    image: '/images/products/earrings-1.jpg',
    category: 'Earrings',
    rating: 4.8,
    reviews: 92,
    inStock: true,
    description: 'Blue sapphires surrounded by diamonds'
  },
  {
    id: 4,
    name: 'Gold Tennis Bracelet',
    price: 1499.99,
    originalPrice: 1799.99,
    image: '/images/products/bracelet-1.jpg',
    category: 'Bracelets',
    rating: 4.6,
    reviews: 78,
    inStock: true,
    discount: 17,
    description: '14K gold with channel-set diamonds'
  },
  {
    id: 5,
    name: 'Rose Gold Watch',
    price: 799.99,
    image: '/images/products/watch-1.jpg',
    category: 'Watches',
    rating: 4.5,
    reviews: 156,
    inStock: true,
    description: 'Rose gold-plated stainless steel with crystal accents'
  },
  {
    id: 6,
    name: 'Diamond Tennis Necklace',
    price: 3999.99,
    originalPrice: 4499.99,
    image: '/images/products/necklace-2.jpg',
    category: 'Necklaces',
    rating: 4.9,
    reviews: 64,
    inStock: true,
    discount: 11,
    description: '5 carat total weight diamonds in 18K white gold'
  }
];

const categories = [
  'All',
  'Rings',
  'Necklaces',
  'Earrings',
  'Bracelets',
  'Watches',
  'Sets'
];

const materialFilters = [
  'All Materials',
  'Gold',
  'White Gold',
  'Rose Gold',
  'Silver',
  'Platinum'
];

const Jewelry = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = jewelryProducts
    .filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPriceRange;
    })
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
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Luxury Jewelry Collection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our exquisite collection of fine jewelry, featuring stunning pieces crafted with 
          precious metals and stones. Each piece is a testament to elegance and craftsmanship.
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn btn-secondary flex items-center space-x-2"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
        </div>
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

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`md:w-64 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
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

          {/* Materials */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Materials</h3>
            <div className="space-y-2">
              {materialFilters.map((material) => (
                <button
                  key={material}
                  onClick={() => setSelectedMaterial(material)}
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
                    selectedMaterial === material
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
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
                max="5000"
                step="100"
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

export default Jewelry;
