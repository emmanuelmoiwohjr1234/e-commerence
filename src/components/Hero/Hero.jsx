import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { searchUnsplashImages, getOptimizedImageUrl } from '../../services/unsplash';

const slides = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "New Arrivals",
    description: "Discover the latest trends in summer fashion",
    buttonText: "Shop Now",
    buttonLink: "/summer-collection",
    searchQuery: "summer fashion model outdoor"
  },
  {
    id: 2,
    title: "Luxury Accessories",
    subtitle: "Premium Selection",
    description: "Elevate your style with our luxury accessories",
    buttonText: "Explore",
    buttonLink: "/accessories",
    searchQuery: "luxury fashion accessories jewelry"
  },
  {
    id: 3,
    title: "Active Wear",
    subtitle: "Performance Meets Style",
    description: "Get ready for your next workout in style",
    buttonText: "Shop Collection",
    buttonLink: "/active-wear",
    searchQuery: "athletic wear fashion sport"
  },
  {
    id: 4,
    title: "Casual Collection",
    subtitle: "Comfort & Style",
    description: "Everyday essentials for your wardrobe",
    buttonText: "Shop Collection",
    buttonLink: "/casual-wear",
    searchQuery: "casual fashion lifestyle"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlideImages = async () => {
      try {
        setIsLoading(true);
        const queries = slides.map(slide => slide.searchQuery);
        const imagePromises = queries.map(query => searchUnsplashImages(query, 1));
        const results = await Promise.all(imagePromises);
        setImages(results.map(result => result[0]));
        setError(null);
      } catch (err) {
        console.error('Error fetching slide images:', err);
        setError('Failed to load images');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlideImages();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative h-[600px] bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-[600px] bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => {
        const image = images[index];
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide
                ? 'translate-x-0'
                : index < currentSlide
                ? '-translate-x-full'
                : 'translate-x-full'
            }`}
          >
            {image && (
              <div className="absolute inset-0">
                <img
                  src={getOptimizedImageUrl(image.urls?.regular, 1920, 1080) || '/placeholder-image.jpg'}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
              </div>
            )}
            
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <h3 className="text-xl font-semibold mb-2">{slide.subtitle}</h3>
                  <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg mb-8">{slide.description}</p>
                  <Link
                    to={slide.buttonLink}
                    className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 text-gray-900 transition-all"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 text-gray-900 transition-all"
      >
        <FaChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
