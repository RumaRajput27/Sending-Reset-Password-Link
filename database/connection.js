const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load .env variables

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('DATABASE_URL is not defined in the .env file');
}

// Initialize Sequelize
const sequelize = new Sequelize(dbUrl, {
  dialect: 'mysql',       // Specify MySQL as the database dialect
  logging: false,         // Disable logging; set to true if you want SQL logs
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;

