import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const unsplashApi = axios.create({
  baseURL: UNSPLASH_API_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const searchUnsplashImage = async (query) => {
  try {
    const response = await unsplashApi.get('/search/photos', {
      params: {
        query,
        per_page: 1,
        orientation: 'landscape',
      },
    });
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    throw error;
  }
};

export const searchUnsplashImages = async (query, count = 1) => {
  try {
    const response = await unsplashApi.get('/search/photos', {
      params: {
        query,
        per_page: count,
        orientation: 'landscape',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    throw error;
  }
};

export const getOptimizedImageUrl = (url, width = 800, height = 600) => {
  if (!url) return null;
  try {
    // Remove any existing parameters
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${width}&h=${height}&fit=crop&auto=format`;
  } catch (error) {
    console.error('Error optimizing image URL:', error);
    return url; // Return original URL as fallback
  }
};
