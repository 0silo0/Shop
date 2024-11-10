// models/orderItem.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');
const Order = require('./order');

const OrderItem = sequelize.define('OrderItem', {
    orderItem_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'order_id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'orderItems',
    timestamps: true
});

module.exports = OrderItem;
