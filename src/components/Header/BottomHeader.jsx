import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

const menuItems = [
  {
    title: 'Home',
    path: '/',
    submenu: [
      { title: 'New Arrivals', path: '/new-arrivals' },
      { title: 'Featured', path: '/featured' },
      { title: 'Bestsellers', path: '/bestsellers' }
    ]
  },
  {
    title: 'Categories',
    path: '/categories',
    submenu: [
      { title: 'All Categories', path: '/categories' },
      { title: 'Trending', path: '/categories/trending' },
      { title: 'Popular', path: '/categories/popular' }
    ]
  },
  {
    title: "Men's",
    path: '/mens',
    submenu: [
      { title: 'Clothing', path: '/mens/clothing' },
      { title: 'Shoes', path: '/mens/shoes' },
      { title: 'Accessories', path: '/mens/accessories' }
    ]
  },
  {
    title: "Women's",
    path: '/womens',
    submenu: [
      { title: 'Clothing', path: '/womens/clothing' },
      { title: 'Shoes', path: '/womens/shoes' },
      { title: 'Accessories', path: '/womens/accessories' }
    ]
  },
  {
    title: 'Jewelry',
    path: '/jewelry',
    submenu: [
      { title: 'Necklaces', path: '/jewelry/necklaces' },
      { title: 'Rings', path: '/jewelry/rings' },
      { title: 'Bracelets', path: '/jewelry/bracelets' }
    ]
  },
  {
    title: 'Perfume',
    path: '/perfume',
    submenu: [
      { title: 'For Her', path: '/perfume/for-her' },
      { title: 'For Him', path: '/perfume/for-him' },
      { title: 'Unisex', path: '/perfume/unisex' }
    ]
  },
  {
    title: 'Blog',
    path: '/blog'
  },
  {
    title: 'Hot Offers',
    path: '/hot-offers'
  }
];

const BottomHeader = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const toggleSubmenu = (index) => {
    setExpandedSubmenu(expandedSubmenu === index ? null : index);
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-4">
        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-between items-center py-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-primary focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <span className="text-gray-800 font-medium">Menu</span>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} py-2`}>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index} className="relative">
                <div className="flex items-center justify-between px-4 py-2 text-gray-700">
                  <Link
                    to={item.path}
                    className="flex-grow hover:text-primary"
                    onClick={() => handleMenuClick(item.path)}
                  >
                    {item.title}
                  </Link>
                  {item.submenu && (
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className="ml-2 p-1 hover:text-primary focus:outline-none"
                    >
                      <FaChevronDown
                        className={`transform transition-transform ${
                          expandedSubmenu === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>
                {item.submenu && expandedSubmenu === index && (
                  <ul className="bg-gray-50 py-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path}
                          className="block px-8 py-2 text-gray-600 hover:text-primary hover:bg-gray-100"
                          onClick={() => handleMenuClick(subItem.path)}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center justify-between">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setActiveMenu(index)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                to={item.path}
                className="flex items-center px-4 py-4 text-gray-700 hover:text-primary transition-colors whitespace-nowrap"
              >
                <span>{item.title}</span>
                {item.submenu && (
                  <FaChevronDown className="ml-1 text-xs" />
                )}
              </Link>

              {/* Desktop Submenu */}
              {activeMenu === index && item.submenu && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 z-50 animate-fadeIn">
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      onClick={() => setActiveMenu(null)}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default BottomHeader;
