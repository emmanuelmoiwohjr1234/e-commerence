const sequelize = require('../config/database');
const Product = require('../models/Product');

const products = [
  {
    name: 'Premium Leather Wallet',
    description: 'Handcrafted genuine leather wallet with multiple card slots and coin pocket',
    price: 49.99,
    category: 'Accessories',
    imageUrl: '',
    thumbnailUrl: '',
    stock: 50
  },
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life',
    price: 199.99,
    category: 'Electronics',
    imageUrl: '',
    thumbnailUrl: '',
    stock: 30
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and eco-friendly cotton t-shirt available in multiple colors',
    price: 24.99,
    category: 'Clothing',
    imageUrl: '',
    thumbnailUrl: '',
    stock: 100
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness with this advanced smartwatch',
    price: 149.99,
    category: 'Electronics',
    imageUrl: '',
    thumbnailUrl: '',
    stock: 25
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Eco-friendly, double-walled insulated water bottle',
    price: 29.99,
    category: 'Accessories',
    imageUrl: '',
    thumbnailUrl: '',
    stock: 75
  }
];

async function initializeDatabase() {
  try {
    // Force sync all models (this will drop existing tables)
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    // Insert sample products
    await Product.bulkCreate(products);
    console.log('Sample products inserted successfully');

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    await sequelize.close();
  }
}

initializeDatabase();
