import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const CategoryItem = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b last:border-b-0">
      <div
        className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-gray-700">{category.name}</span>
        <button className="text-gray-400 hover:text-primary">
          {isExpanded ? <FaMinus /> : <FaPlus />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="bg-gray-50 py-2">
          {category.subcategories.map((sub) => (
            <div
              key={sub.name}
              className="flex items-center justify-between px-6 py-2 hover:bg-gray-100"
            >
              <span className="text-gray-600">{sub.name}</span>
              <span className="text-gray-400 text-sm">({sub.count})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
