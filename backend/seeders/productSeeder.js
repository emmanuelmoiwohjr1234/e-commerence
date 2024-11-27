const Product = require('../models/Product');
const sequelize = require('../config/database');

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

async function seedProducts() {
  try {
    await sequelize.sync({ force: true }); // This will drop the table if it exists
    console.log('Database synced');

    await Product.bulkCreate(products);
    console.log('Products seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
