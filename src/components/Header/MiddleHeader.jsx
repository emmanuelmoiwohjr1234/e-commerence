import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingCart, FaSearch, FaAngleDown, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import TopHeader from './TopHeader';
import BottomHeader from './BottomHeader';

const MiddleHeader = () => {
  const navigate = useNavigate();
  const { user, setShowAuth, setAuthType, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAccountClick = () => {
    if (user) {
      setShowDropdown(!showDropdown);
    } else {
      setAuthType('signin');
      setShowAuth(true);
    }
  };

  const handleSignOut = () => {
    signOut();
    setShowDropdown(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Logo
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full py-2 px-4 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Account */}
            <div className="relative">
              <button
                onClick={handleAccountClick}
                className="flex items-center space-x-1 text-gray-600 hover:text-primary"
              >
                <FaUser />
                <span className="hidden md:inline">
                  {user ? user.name : 'Account'}
                </span>
                {user && <FaAngleDown />}
              </button>

              {/* Account Dropdown */}
              {showDropdown && user && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary"
            >
              <FaHeart />
              <span className="hidden md:inline">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary"
            >
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="hidden md:inline">Cart</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <form
          onSubmit={handleSearch}
          className="mt-4 md:hidden"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full py-2 px-4 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
            >
              <FaSearch />
            </button>
          </div>
        </form>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="mt-4 md:hidden">
            <div className="flex flex-col space-y-2">
              <TopHeader isMobile={true} />
              <Link
                to="/wishlist"
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                to="/cart"
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </Link>
              <BottomHeader isMobile={true} />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default MiddleHeader;
