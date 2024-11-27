const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./config/database');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));
app.use(express.json());

// Database connection
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');

    // Check if products exist
    const productCount = await require('./models/Product').count();
    if (productCount === 0) {
      // If no products exist, run the seeder
      console.log('No products found. Seeding database...');
      await require('./seedData').seedDatabase();
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.error('Error details:', error.message);
  }
}

initializeDatabase();

// Serve static files from the public directory
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
const productsRouter = require('./routes/products');
const imagesRouter = require('./routes/images');
const authRouter = require('./routes/auth');
const newsletterRouter = require('./routes/newsletter');

// API routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/images', imagesRouter);
app.use('/api/newsletter', newsletterRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Serve static files and handle client-side routing
if (process.env.NODE_ENV === 'production') {
  // Production mode
  const staticPath = path.join(__dirname, '../dist');
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
} else {
  // Development mode
  app.use(express.static(path.join(__dirname, '../public')));
  
  // Catch-all route to handle client-side routing in development
  app.get('*', (req, res) => {
    // Check if the request is for an API route
    if (req.url.startsWith('/api/')) {
      res.status(404).json({ message: 'API endpoint not found' });
    } else {
      // For all other routes, redirect to the Vite dev server
      res.redirect('http://localhost:5173' + req.url);
    }
  });
}

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
