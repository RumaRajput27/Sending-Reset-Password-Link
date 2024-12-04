const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING, // Ensure this matches the database column name
      allowNull: false,
    },
  },
  {
    tableName: 'Users', // Ensure the table name matches your database schema
    timestamps: true, // Enable timestamps
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = User;








// const { DataTypes } = require('sequelize');
// const sequelize = require('../database/connection');

// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = User;

