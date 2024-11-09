const CartItem = require('../models/cartItem');
const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require("jsonwebtoken");

class CartItemController {
    async addCartItem(req, res) {
        try {
            const { itemId } = req.body;
            const token = req.headers['auth-token'];

            if (!token) {
                return res.status(403).json({ error: 'No token provided' });
            }

            let userId;
            try {
                const decoded = jwt.verify(token, 'jwtsecret');
                userId = decoded.user_id;
            } catch (error) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }

            if (!itemId) {
                return res.status(400).json({ error: 'Product ID is required' });
            }

            const product = await Product.findByPk(itemId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Проверить, есть ли уже этот товар в корзине
            let cartItem = await CartItem.findOne({
                where: {
                    user_id: userId,
                    product_id: itemId
                }
            });

            if (cartItem) {
                cartItem.quantity += 1;
                await cartItem.save();
            } else {
                cartItem = await CartItem.create({
                    user_id: userId,
                    product_id: itemId,
                    quantity: 1
                });
            }

            res.status(200).json({
                message: 'Item added to cart',
                cartItem
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while adding item to cart' });
        }
    }

    async deleteFromCartItem(req, res) {
        try {
            const { itemId } = req.body;
            const token = req.headers['auth-token'];

            if (!token) {
                return res.status(403).json({ error: 'No token provided' });
            }

            let userId;
            try {
                const decoded = jwt.verify(token, 'jwtsecret');
                userId = decoded.user_id;
            } catch (error) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }

            if (!itemId) {
                return res.status(400).json({ error: 'Product ID is required' });
            }

            const product = await Product.findByPk(itemId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Проверить, есть ли уже этот товар в корзине
            let cartItem = await CartItem.findOne({
                where: {
                    user_id: userId,
                    product_id: itemId
                }
            });

            if (cartItem) {
                if (cartItem.quantity === 1) {
                    // Удаляем товар, если количество равно 1
                    const rowsDeleted = await CartItem.destroy({ where: { product_id: itemId, user_id: userId } });

                    if (rowsDeleted > 0) {
                        return res.json({ message: 'Cart item deleted' });
                    } else {
                        return res.status(404).json({ message: "Cart item could not be deleted" });
                    }
                } else if (cartItem.quantity > 1) {
                    // Уменьшаем количество на 1
                    cartItem.quantity -= 1;
                    await cartItem.save();
                    return res.status(200).json({
                        message: 'Cart item quantity decreased',
                        cartItem
                    });
                }
            } else {
                return res.status(404).json({ message: "Cart item not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while removing item from cart' });
        }
    }

    async getCartItems(req, res) {
        try {
            const token = req.headers['auth-token'];

            if (!token) {
                return res.status(403).json({ error: 'No token provided' });
            }

            let userId;
            try {
                const decoded = jwt.verify(token, 'jwtsecret');
                userId = decoded.user_id;
            } catch (error) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }

            // Получить все товары в корзине для этого пользователя
            const cartItems = await CartItem.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: Product,
                    }
                ]
            });

            if (cartItems.length === 0) {
                return res.status(404).json({ message: 'Cart is empty' });
            }

            res.status(200).json(cartItems); // Отправить все товары в корзине
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while retrieving cart items' });
        }
    }
}

module.exports = new CartItemController();
