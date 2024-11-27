import { useState, useEffect } from 'react';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

const useUnsplashImage = (query, fallbackImage = '/src/assets/images/placeholder-product.svg', orientation = 'landscape') => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (!query) {
        setImage(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // First try the backend endpoint
        const backendResponse = await axios.get(`/api/images/unsplash/${encodeURIComponent(query)}?orientation=${orientation}`);
        setImage(backendResponse.data.url);
      } catch (backendError) {
        console.warn('Backend image fetch failed, trying direct Unsplash API:', backendError);
        
        try {
          // Fallback to direct Unsplash API if backend fails
          const unsplashResponse = await axios.get(
            `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(query)}&orientation=${orientation}`,
            {
              headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
              }
            }
          );
          setImage(unsplashResponse.data.urls.regular);
        } catch (unsplashError) {
          console.error('Both backend and Unsplash API failed:', unsplashError);
          setError(unsplashError);
          setImage(fallbackImage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [query, orientation]);

  return { image, error, isLoading };
};

export default useUnsplashImage;
