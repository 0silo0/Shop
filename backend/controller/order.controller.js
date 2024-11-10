const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const User = require('../models/user');
const Product = require('../models/Product');
const jwt = require("jsonwebtoken");

class OrderController {
    async createOrder(req, res) {
        try {
            console.log('Received body:', req.body);
            const { orderItems, customerInfo } = req.body;
            const token = req.headers['auth-token'];

            if (!token) {
                return res.status(403).json({ error: 'No token provided' });
            }

            let userId;
            try {
                const decoded = jwt.verify(token, 'jwtsecret');
                userId = decoded.user_id;
            } catch (error) {
                console.log("Invalid or expired token", error);
                return res.status(401).json({ error: 'Invalid or expired token' });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                console.log(`User with id ${userId} not found`);
                return res.status(404).json({ error: 'User not found' });
            }

            const item = orderItems[0]; 

            const product = await Product.findByPk(item.product_id);
            if (!product) {
                console.log(`Product with id ${item.product_id} not found`);
                return res.status(404).json({ error: `Product with id ${item.product_id} not found` });
            }

            const order = await Order.create({
                user_id: userId,
                product_id: item.product_id,
                ...customerInfo,
                quantity: item.quantity,
                total: product.new_price * item.quantity
            });

            console.log("Order created successfully:", order);
            res.status(201).json({ message: 'Order created successfully', order });
        } catch (error) {
            console.error("Error in createOrder:", error);
            res.status(500).json({ error: 'An error occurred while creating the order' });
        }
    }

    async getOrders(req, res) {
        try {
            // const orders = await Order.findAll({
            //     include: [{
            //         model: User,
            //     },
            //     {
            //         model: Product,
            //     }]
            // });

            const orders = await Order.findAll({});
    
            if (orders.length === 0) {
                return res.status(404).json({ message: 'No orders found' });
            }

            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while retrieving orders' });
        }
    }

    async getInfoOrder(req, res) {
        const { order_id } = req.params;
        try {
            const order = await Order.findOne({
                where: { order_id }
            });
    
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
    
            res.status(200).json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while retrieving the order' });
        }
    }

    async updateOrder(req, res) {
        try {
            const [updated] = await Order.update(req.body, {
                where: { order_id: req.params.order_id },
            });
    
            if (updated === 0) {
                return res.status(404).json({ message: 'Заказ не найден' });
            }
    
            const updatedOrder = await Order.findByPk(req.params.order_id);
            
            res.json(updatedOrder);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка обновления заказа', error });
        }
    }

    async deleteOrder(req, res) {
        try {
            const { orderId } = req.params;
            const token = req.headers['auth-token'];

            if (!token) {
                return res.status(403).json({ error: 'No token provided' });
            }

            let userId;
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.user_id;
            } catch (error) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }

            const order = await Order.findOne({ where: { id: orderId, user_id: userId } });
            if (!order) {
                return res.status(404).json({ message: 'Order not found or does not belong to the user' });
            }

            await OrderItem.destroy({ where: { order_id: orderId } }); // Удаляем товары заказа
            await Order.destroy({ where: { id: orderId } }); // Удаляем сам заказ

            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the order' });
        }
    }
}

module.exports = new OrderController();
