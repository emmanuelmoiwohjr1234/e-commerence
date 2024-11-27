const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const categories = ['electronics', 'clothing', 'furniture', 'books', 'sports'];
const products = [
  {
    name: 'Premium Laptop',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    category: 'electronics',
    stock: 50,
    query: 'modern laptop computer'
  },
  {
    name: 'Casual Denim Jacket',
    description: 'Stylish and comfortable denim jacket',
    price: 79.99,
    category: 'clothing',
    stock: 100,
    query: 'denim jacket fashion'
  },
  {
    name: 'Modern Sofa',
    description: 'Contemporary design sofa for your living room',
    price: 899.99,
    category: 'furniture',
    stock: 20,
    query: 'modern sofa furniture'
  },
  {
    name: 'Bestseller Book Collection',
    description: 'Collection of top-rated books',
    price: 149.99,
    category: 'books',
    stock: 75,
    query: 'stack of books'
  },
  {
    name: 'Professional Tennis Racket',
    description: 'High-quality tennis racket for professionals',
    price: 199.99,
    category: 'sports',
    stock: 30,
    query: 'tennis racket professional'
  }
];

async function getUnsplashImage(query) {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: 1
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    if (response.data.results.length > 0) {
      const image = response.data.results[0];
      return {
        imageUrl: image.urls.regular,
        thumbnailUrl: image.urls.thumb
      };
    }
    throw new Error('No image found');
  } catch (error) {
    console.error(`Error fetching image for ${query}:`, error.message);
    return null;
  }
}

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Add new products with images
    for (const product of products) {
      const imageData = await getUnsplashImage(product.query);
      if (imageData) {
        const newProduct = new Product({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          imageUrl: imageData.imageUrl,
          thumbnailUrl: imageData.thumbnailUrl
        });
        await newProduct.save();
        console.log(`Added product: ${product.name}`);
      }
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedProducts();
