import React from 'react';
import CategoryItem from './CategoryItem';

const categories = [
  {
    name: 'Clothes',
    subcategories: [
      { name: 'Shirt', count: 300 },
      { name: 'Jacket', count: 40 },
      { name: 'Dress & Frock', count: 76 }
    ]
  },
  {
    name: 'Footwear',
    subcategories: [
      { name: 'Sports', count: 45 },
      { name: 'Casual', count: 75 },
      { name: 'Formal', count: 35 }
    ]
  },
  {
    name: 'Jewelry',
    subcategories: [
      { name: 'Earrings', count: 46 },
      { name: 'Necklace', count: 34 },
      { name: 'Rings', count: 60 }
    ]
  },
  {
    name: 'Perfume',
    subcategories: [
      { name: 'Mens', count: 50 },
      { name: 'Womens', count: 65 },
      { name: 'Unisex', count: 25 }
    ]
  },
  {
    name: 'Glasses',
    subcategories: [
      { name: 'Sunglasses', count: 80 },
      { name: 'Prescription', count: 45 }
    ]
  },
  {
    name: 'Bags',
    subcategories: [
      { name: 'Handbags', count: 55 },
      { name: 'Backpacks', count: 40 },
      { name: 'Wallets', count: 25 }
    ]
  },
  {
    name: 'Cosmetics',
    subcategories: [
      { name: 'Makeup', count: 95 },
      { name: 'Skincare', count: 85 },
      { name: 'Haircare', count: 45 }
    ]
  }
];

const Sidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm hidden lg:block w-[300px]">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Categories</h2>
      </div>

      {/* Categories List */}
      <div className="divide-y">
        {categories.map((category) => (
          <CategoryItem key={category.name} category={category} />
        ))}
      </div>

      {/* Optional Footer */}
      <div className="p-4 border-t">
        <button className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
