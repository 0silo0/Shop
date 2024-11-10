// models/associations.js
const User = require('./user');
const Product = require('./Product');
const CartItem = require('./cartItem');
const Order = require('./order');

// Ассоциации для CartItem
User.hasMany(CartItem, { foreignKey: 'user_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(User, { foreignKey: 'user_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(Order, { foreignKey: 'product_id' });  // Связь между заказом и продуктом
Order.belongsTo(Product, { foreignKey: 'product_id' }); // Связь между заказом и продуктом


module.exports = {
  User,
  Product,
  CartItem,
  Order
};
