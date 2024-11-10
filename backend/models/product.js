
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const CartItem = require('./cartItem');

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  category_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  old_price: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  new_price: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'product',
  timestamps: true
});

module.exports = Product;
