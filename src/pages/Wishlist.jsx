import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash, FaShare } from 'react-icons/fa';

const sampleWishlist = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: '/images/products/tshirt-1.jpg',
    inStock: true,
    discount: 0,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: 'Leather Crossbody Bag',
    price: 89.99,
    originalPrice: 119.99,
    image: '/images/products/bag.jpg',
    inStock: true,
    discount: 25,
    rating: 4.8,
    reviews: 96
  },
  {
    id: 3,
    name: 'Gold Pendant Necklace',
    price: 159.99,
    image: '/images/products/necklace.jpg',
    inStock: false,
    discount: 0,
    rating: 4.7,
    reviews: 64
  },
  {
    id: 4,
    name: 'Designer Sunglasses',
    price: 199.99,
    originalPrice: 249.99,
    image: '/images/products/sunglasses.jpg',
    inStock: true,
    discount: 20,
    rating: 4.6,
    reviews: 82
  }
];

const WishlistItem = ({ item, onRemove, onShare, onMoveToCart }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="relative group">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
          <Link
            to={`/product/${item.id}`}
            className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
        {item.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
            {item.discount}% OFF
          </div>
        )}
      </div>

      <div className="mt-4">
        <Link
          to={`/product/${item.id}`}
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          {item.name}
        </Link>
        
        <div className="flex items-center mt-2">
          {item.discount > 0 ? (
            <>
              <span className="text-lg font-bold text-primary">${item.price}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${item.originalPrice}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">${item.price}</span>
          )}
        </div>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(item.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-600">
              ({item.reviews})
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {item.inStock ? (
            <button
              onClick={() => onMoveToCart(item.id)}
              className="w-full btn btn-primary flex items-center justify-center space-x-2"
            >
              <FaShoppingCart />
              <span>Move to Cart</span>
            </button>
          ) : (
            <button
              disabled
              className="w-full btn bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Out of Stock</span>
            </button>
          )}

          <div className="flex space-x-2">
            <button
              onClick={() => onShare(item.id)}
              className="flex-1 btn btn-secondary flex items-center justify-center space-x-2"
            >
              <FaShare />
              <span>Share</span>
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="flex-1 btn btn-secondary flex items-center justify-center space-x-2 hover:bg-red-50 hover:text-red-500"
            >
              <FaTrash />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(sampleWishlist);

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  };

  const handleShare = (itemId) => {
    // Add share functionality
    console.log('Share item:', itemId);
  };

  const handleMoveToCart = (itemId) => {
    // Add move to cart functionality
    console.log('Move to cart:', itemId);
    handleRemoveFromWishlist(itemId);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">My Wishlist</h1>
        <div className="text-gray-600">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <FaHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Add items you love to your wishlist. Review them anytime and easily move them to the cart.
          </p>
          <Link to="/categories" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onRemove={handleRemoveFromWishlist}
              onShare={handleShare}
              onMoveToCart={handleMoveToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
