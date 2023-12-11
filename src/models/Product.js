const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  notify: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  notification_threshold: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'not_set',
  },
  created_at: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
});

module.exports = Product;
