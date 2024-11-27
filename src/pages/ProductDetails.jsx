import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaShare, FaMinus, FaPlus } from 'react-icons/fa';

const sampleProduct = {
  id: 1,
  name: 'Classic White T-Shirt',
  price: 29.99,
  description: 'Premium cotton casual wear perfect for everyday use. Features a comfortable fit and durable fabric that maintains its shape after washing.',
  rating: 4.5,
  reviews: 128,
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['white', 'black', 'gray', 'navy'],
  images: [
    '/images/products/tshirt-1.jpg',
    '/images/products/tshirt-2.jpg',
    '/images/products/tshirt-3.jpg',
    '/images/products/tshirt-4.jpg',
  ],
  features: [
    'Premium cotton material',
    'Comfortable regular fit',
    'Reinforced stitching',
    'Pre-shrunk fabric',
    'Machine washable'
  ],
  specifications: {
    Material: '100% Cotton',
    Fit: 'Regular',
    Care: 'Machine wash cold',
    Origin: 'Made in USA'
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(sampleProduct.images[0]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={mainImage}
              alt={sampleProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {sampleProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 ${
                  mainImage === image ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${sampleProduct.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{sampleProduct.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {renderStars(sampleProduct.rating)}
                <span className="ml-2 text-gray-600">
                  ({sampleProduct.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="text-2xl font-bold text-primary">
            ${sampleProduct.price}
          </div>

          <p className="text-gray-600">{sampleProduct.description}</p>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sampleProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md border ${
                    selectedSize === size
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {sampleProduct.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="p-2 rounded-md border hover:border-primary"
              >
                <FaMinus />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                className="p-2 rounded-md border hover:border-primary"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 btn btn-primary flex items-center justify-center space-x-2">
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
            <button className="p-3 rounded-lg border hover:border-primary">
              <FaHeart className="text-gray-400 hover:text-primary" />
            </button>
            <button className="p-3 rounded-lg border hover:border-primary">
              <FaShare className="text-gray-400 hover:text-primary" />
            </button>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {sampleProduct.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="font-semibold mb-2">Specifications</h3>
            <div className="space-y-2">
              {Object.entries(sampleProduct.specifications).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="w-24 text-gray-600">{key}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
