// models/associations.js
const User = require('./user');
const Product = require('./Product');
const CartItem = require('./cartItem');
const Order = require('./order');
const OrderItem = require('./orderItem');

// Ассоциации для CartItem
User.hasMany(CartItem, { foreignKey: 'user_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(User, { foreignKey: 'user_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

// Ассоциации для Order и OrderItem
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  User,
  Product,
  CartItem,
  Order,
  OrderItem
};
