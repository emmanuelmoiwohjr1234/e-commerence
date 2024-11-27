import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchUnsplashImage, getOptimizedImageUrl } from '../../services/unsplash';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProductImage = async () => {
      if (!product) return;

      if (product.imageUrl) {
        setImageUrl(product.imageUrl);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const searchQuery = `${product.category} ${product.name} product`;
        const photo = await searchUnsplashImage(searchQuery);
        if (photo) {
          setImageUrl(getOptimizedImageUrl(photo, { width: 400, quality: 80 }));
          setImageError(false);
        }
      } catch (error) {
        console.error('Error fetching product image:', error);
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductImage();
  }, [product]);

  const handleImageError = () => {
    setImageError(true);
    // Using a data URI for the placeholder image
    setImageUrl(`data:image/svg+xml,${encodeURIComponent(`
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">
          Image Not Available
        </text>
      </svg>
    `)}`);
  };

  if (!product) {
    return null;
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <img
              src={imageError ? imageUrl : imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              onError={handleImageError}
            />
          )}
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              -{product.discount}%
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviews || 0} reviews)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.discount > 0 ? (
                <>
                  <span className="text-lg font-bold text-gray-900">
                    ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  ${(product.price || 0).toFixed(2)}
                </span>
              )}
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart functionality
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    category: PropTypes.string.isRequired,
    discount: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
