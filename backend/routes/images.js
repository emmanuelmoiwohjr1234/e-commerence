const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Cache for storing image responses
const imageCache = new Map();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// Helper function to get cached image or fetch new one
const getCachedOrFetchImage = async (query, orientation = 'landscape') => {
  const cacheKey = `single_${query}_${orientation}`;
  const cachedData = imageCache.get(cacheKey);
  
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  const response = await fetch(
    `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(query)}&orientation=${orientation}`,
    {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    }
  );

  if (!response.ok) {
    if (response.status === 429) {
      // Return a default image on rate limit
      return {
        url: '/assets/images/placeholder-product.svg',
        thumb: '/assets/images/placeholder-product.svg',
        photographer: 'Default',
        photographerUrl: '#'
      };
    }
    throw new Error(`Unsplash API error: ${response.statusText}`);
  }

  const data = await response.json();
  const imageData = {
    url: data.urls.regular,
    thumb: data.urls.thumb,
    photographer: data.user.name,
    photographerUrl: data.user.links.html,
    description: data.description || data.alt_description || query
  };

  imageCache.set(cacheKey, {
    data: imageData,
    timestamp: Date.now()
  });

  return imageData;
};

// Get a single random image based on query
router.get('/unsplash/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { orientation = 'landscape' } = req.query;
    const imageData = await getCachedOrFetchImage(query, orientation);
    res.json(imageData);
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    res.status(500).json({ 
      message: 'Failed to fetch image',
      error: error.message 
    });
  }
});

// Get multiple random images based on query and count
router.get('/unsplash/:query/:count', async (req, res) => {
  try {
    const { query, count } = req.params;
    const orientation = req.query.orientation || 'landscape';
    const numImages = parseInt(count) || 1;
    
    // Create an array of promises for parallel image fetching
    const imagePromises = Array(numImages).fill().map(() => 
      getCachedOrFetchImage(query, orientation)
        .catch(() => ({
          url: '/assets/images/placeholder-product.svg',
          thumb: '/assets/images/placeholder-product.svg',
          photographer: 'Default',
          photographerUrl: '#'
        }))
    );

    const images = await Promise.all(imagePromises);
    res.json(images);
  } catch (error) {
    console.error('Error fetching multiple images:', error);
    res.status(500).json({ 
      error: 'Failed to fetch images',
      details: error.message 
    });
  }
});

module.exports = router;
