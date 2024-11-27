const sequelize = require('./config/database');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced features',
    price: 999.99,
    stock: 50,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200'
  },
  {
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1499.99,
    stock: 30,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    thumbnailUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200'
  },
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling headphones',
    price: 299.99,
    stock: 100,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'
  }
];

async function seedDatabase() {
  try {
    // Create products if they don't exist
    for (const product of sampleProducts) {
      const existingProduct = await Product.findOne({ where: { name: product.name } });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`Created product: ${product.name}`);
      }
    }
    
    console.log('Database seeded successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Export the function
module.exports = {
  seedDatabase
};
