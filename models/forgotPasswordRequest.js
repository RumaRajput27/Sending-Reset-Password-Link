const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Set up the DB connection
const User = require('./user'); // Import User model

const ForgotPasswordRequest = sequelize.define('ForgotPasswordRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'ForgotPasswordRequests',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = ForgotPasswordRequest;
 