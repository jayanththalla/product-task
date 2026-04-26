const app = require('./app');
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Sync database and start server
const startServer = async () => {
  try {
    // In production, you might want to use migrations instead of sync()
    // { force: false } ensures tables are not dropped if they already exist
    await sequelize.sync({ force: false });
    console.log('Database connected and synced');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
