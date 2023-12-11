const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const ShoppingList = sequelize.define('ShoppingList', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ShoppingList;
