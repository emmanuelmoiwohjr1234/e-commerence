const sequelize = require('../config/database');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to database has been established successfully.');
    
    // Test database sync
    await sequelize.sync({ force: false });
    console.log('✅ Database synchronized successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
}

testConnection();
