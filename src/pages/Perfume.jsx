import React, { useState } from 'react';
import { FaFilter, FaSort, FaHeart } from 'react-icons/fa';
import ProductCard from '../components/Products/ProductCard';

const perfumeProducts = [
  {
    id: 1,
    name: 'Chanel N°5',
    price: 135.99,
    image: '/images/products/perfume-1.jpg',
    category: 'Women',
    brand: 'Chanel',
    rating: 4.9,
    reviews: 256,
    inStock: true,
    description: 'The classic floral-aldehyde fragrance',
    notes: ['Rose', 'Jasmine', 'Citrus']
  },
  {
    id: 2,
    name: 'Bleu de Chanel',
    price: 104.99,
    image: '/images/products/perfume-2.jpg',
    category: 'Men',
    brand: 'Chanel',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    description: 'A woody aromatic fragrance for men',
    notes: ['Citrus', 'Cedar', 'Sandalwood']
  },
  {
    id: 3,
    name: 'La Vie Est Belle',
    price: 99.99,
    originalPrice: 129.99,
    image: '/images/products/perfume-3.jpg',
    category: 'Women',
    brand: 'Lancôme',
    rating: 4.7,
    reviews: 178,
    inStock: true,
    discount: 23,
    description: 'A feminine fragrance with iris and vanilla',
    notes: ['Iris', 'Vanilla', 'Praline']
  },
  {
    id: 4,
    name: 'Sauvage',
    price: 149.99,
    image: '/images/products/perfume-4.jpg',
    category: 'Men',
    brand: 'Dior',
    rating: 4.9,
    reviews: 312,
    inStock: true,
    description: 'A fresh and spicy masculine fragrance',
    notes: ['Bergamot', 'Pepper', 'Ambroxan']
  },
  {
    id: 5,
    name: 'Good Girl',
    price: 119.99,
    originalPrice: 139.99,
    image: '/images/products/perfume-5.jpg',
    category: 'Women',
    brand: 'Carolina Herrera',
    rating: 4.6,
    reviews: 145,
    inStock: true,
    discount: 14,
    description: 'A sophisticated feminine fragrance',
    notes: ['Jasmine', 'Cocoa', 'Tonka Bean']
  },
  {
    id: 6,
    name: 'Y Eau de Parfum',
    price: 129.99,
    image: '/images/products/perfume-6.jpg',
    category: 'Men',
    brand: 'YSL',
    rating: 4.7,
    reviews: 167,
    inStock: true,
    description: 'A fresh and woody masculine fragrance',
    notes: ['Sage', 'Ginger', 'Cedar']
  }
];

const categories = ['All', 'Men', 'Women', 'Unisex'];
const brands = ['All Brands', 'Chanel', 'Dior', 'YSL', 'Lancôme', 'Carolina Herrera'];
const notes = [
  'All Notes',
  'Floral',
  'Woody',
  'Oriental',
  'Fresh',
  'Spicy',
  'Citrus'
];

const Perfume = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedNote, setSelectedNote] = useState('All Notes');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = perfumeProducts
    .filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All Brands' || product.brand === selectedBrand;
      const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesBrand && matchesPriceRange;
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
        <h1 className="text-4xl font-bold mb-4">Luxury Fragrances</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our collection of premium fragrances from the world's most prestigious brands. 
          Each scent tells a unique story and leaves a lasting impression.
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

          {/* Brands */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
                    selectedBrand === brand
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Notes</h3>
            <div className="space-y-2">
              {notes.map((note) => (
                <button
                  key={note}
                  onClick={() => setSelectedNote(note)}
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
                    selectedNote === note
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {note}
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
                max="300"
                step="10"
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

export default Perfume;
