import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaFire, FaTag } from 'react-icons/fa';
import ProductCard from '../components/Products/ProductCard';

const hotDeals = [
  {
    id: 1,
    name: 'Diamond Stud Earrings',
    price: 599.99,
    originalPrice: 999.99,
    image: '/images/products/earrings-2.jpg',
    category: 'Jewelry',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    discount: 40,
    endsIn: '2024-01-15',
    description: '0.5 carat total weight diamond studs in 14K white gold'
  },
  {
    id: 2,
    name: 'Designer Handbag',
    price: 299.99,
    originalPrice: 499.99,
    image: '/images/products/bag-2.jpg',
    category: 'Accessories',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    discount: 40,
    endsIn: '2024-01-10',
    description: 'Genuine leather designer handbag with gold hardware'
  },
  {
    id: 3,
    name: 'Men\'s Luxury Watch',
    price: 799.99,
    originalPrice: 1299.99,
    image: '/images/products/watch-2.jpg',
    category: 'Watches',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    discount: 38,
    endsIn: '2024-01-20',
    description: 'Automatic movement with sapphire crystal'
  }
];

const flashSales = [
  {
    id: 4,
    name: 'Summer Dress Collection',
    price: 49.99,
    originalPrice: 89.99,
    image: '/images/products/dress-2.jpg',
    category: 'Women\'s Fashion',
    rating: 4.5,
    reviews: 78,
    inStock: true,
    discount: 44,
    endsIn: '2024-01-05',
    description: 'Floral print summer dresses in various styles'
  },
  {
    id: 5,
    name: 'Premium Perfume Set',
    price: 129.99,
    originalPrice: 199.99,
    image: '/images/products/perfume-set.jpg',
    category: 'Perfume',
    rating: 4.6,
    reviews: 112,
    inStock: true,
    discount: 35,
    endsIn: '2024-01-08',
    description: 'Set of 3 luxury perfumes in gift packaging'
  }
];

const clearanceItems = [
  {
    id: 6,
    name: 'Men\'s Casual Shoes',
    price: 59.99,
    originalPrice: 129.99,
    image: '/images/products/shoes-1.jpg',
    category: 'Men\'s Fashion',
    rating: 4.4,
    reviews: 167,
    inStock: true,
    discount: 54,
    description: 'Comfortable casual shoes for everyday wear'
  },
  {
    id: 7,
    name: 'Silver Bracelet Set',
    price: 39.99,
    originalPrice: 79.99,
    image: '/images/products/bracelet-set.jpg',
    category: 'Jewelry',
    rating: 4.3,
    reviews: 95,
    inStock: true,
    discount: 50,
    description: 'Set of 3 sterling silver bracelets'
  }
];

const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <FaClock className="text-red-500" />
      <span>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  );
};

const HotOffers = () => {
  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Hot Offers & Deals</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don't miss out on these amazing deals! Limited time offers on premium products 
          with massive discounts. Shop now before they're gone!
        </p>
      </div>

      {/* Hot Deals Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <FaFire className="text-red-500 mr-2" />
            Hot Deals of the Week
          </h2>
          <Link to="/categories" className="text-primary hover:underline">
            View All Deals
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotDeals.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <div className="absolute top-4 right-4">
                <CountdownTimer endDate={product.endsIn} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sales Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <FaTag className="text-yellow-500 mr-2" />
            Flash Sales
          </h2>
          <Link to="/categories" className="text-primary hover:underline">
            View All Sales
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashSales.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <div className="absolute top-4 right-4">
                <CountdownTimer endDate={product.endsIn} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clearance Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Clearance Items</h2>
          <Link to="/categories" className="text-primary hover:underline">
            View All Clearance
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clearanceItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <div className="bg-primary text-white rounded-lg p-8 mt-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Never Miss a Deal!
          </h2>
          <p className="mb-6">
            Subscribe to our newsletter and be the first to know about our exclusive offers and flash sales.
          </p>
          <form className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input bg-white text-gray-900 w-full md:w-auto"
            />
            <button
              type="submit"
              className="btn bg-white text-primary hover:bg-gray-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotOffers;
