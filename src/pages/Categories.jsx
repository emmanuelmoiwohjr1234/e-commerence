import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFilter, FaTimes } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    name: "Men's Fashion",
    image: '/images/categories/mens.jpg',
    itemCount: 450,
    path: '/mens',
    subcategories: ['Clothing', 'Shoes', 'Accessories', 'Sportswear']
  },
  {
    id: 2,
    name: "Women's Fashion",
    inStock: true,
    searchQuery: 'floral summer dress fashion',
    itemCount: 650,
    path: '/womens',
    subcategories: ['Clothing', 'Shoes', 'Bags', 'Jewelry']
  },
  {
    id: 3,
    name: 'Jewelry',
    image: '/images/categories/jewelry.jpg',
    itemCount: 150,
    path: '/jewelry',
    subcategories: ['Necklaces', 'Rings', 'Earrings', 'Bracelets']
  },
  {
    id: 4,
    name: 'Perfume',
    image: '/images/categories/perfume.jpg',
    itemCount: 120,
    path: '/perfume',
    subcategories: ['Men', 'Women', 'Unisex']
  },
  {
    id: 5,
    name: 'Accessories',
    image: '/images/categories/accessories.jpg',
    itemCount: 300,
    path: '/accessories',
    subcategories: ['Bags', 'Watches', 'Sunglasses', 'Belts']
  },
  {
    id: 6,
    name: 'Beauty',
    image: '/images/categories/beauty.jpg',
    itemCount: 250,
    path: '/beauty',
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances']
  }
];

const filters = {
  priceRange: [
    { id: 'price-0-50', label: '$0 - $50', value: [0, 50] },
    { id: 'price-51-100', label: '$51 - $100', value: [51, 100] },
    { id: 'price-101-200', label: '$101 - $200', value: [101, 200] },
    { id: 'price-201-plus', label: '$201+', value: [201, null] }
  ],
  brands: [
    'Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour',
    'Zara', 'H&M', 'Uniqlo', 'Gucci', 'Louis Vuitton'
  ],
  ratings: [
    { value: 4, label: '4★ & up' },
    { value: 3, label: '3★ & up' },
    { value: 2, label: '2★ & up' },
    { value: 1, label: '1★ & up' }
  ]
};

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white text-xl font-semibold">{category.name}</h3>
          <p className="text-white/80 text-sm">{category.itemCount} items</p>
        </div>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          {category.subcategories.map((sub, index) => (
            <li key={index}>
              <Link 
                to={`${category.path}/${sub.toLowerCase()}`}
                className="text-gray-600 hover:text-primary flex items-center group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  {sub}
                </span>
                <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`
      md:block
      ${isOpen ? 'block' : 'hidden'}
      md:sticky md:top-20 md:h-[calc(100vh-5rem)]
      w-full md:w-64 bg-white overflow-y-auto
      ${isOpen ? 'fixed inset-0 z-50 md:relative md:inset-auto' : ''}
    `}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Price Range</h3>
          {filters.priceRange.map((range) => (
            <label key={range.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary rounded border-gray-300"
              />
              <span className="ml-2 text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>

        {/* Brands */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Brands</h3>
          <div className="space-y-2">
            {filters.brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded border-gray-300"
                />
                <span className="ml-2 text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ratings */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Ratings</h3>
          {filters.ratings.map((rating) => (
            <label key={rating.value} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary rounded border-gray-300"
              />
              <span className="ml-2 text-gray-700">{rating.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

const Categories = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden mb-4 flex items-center text-gray-700 hover:text-primary"
        >
          <FaFilter className="mr-2" />
          <span>Show Filters</span>
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
