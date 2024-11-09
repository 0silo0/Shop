const User = require('./User');
const Product = require('./Product');
const CartItem = require('./cartItem');

// Определяем ассоциации
User.hasMany(CartItem, { foreignKey: 'user_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(User, { foreignKey: 'user_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  User,
  Product,
  CartItem,
};
