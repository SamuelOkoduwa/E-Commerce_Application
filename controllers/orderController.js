const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get all orders (admin only)
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'username email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get orders for the logged-in user
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new order
const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'No items in the cart' });
        }

        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        }));

        const totalPrice = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

        const order = new Order({
            user: req.user._id,
            products: orderItems,
            total_price: totalPrice,
            status: 'Pending',
        });

        await order.save();

        // Clear the cart after placing the order
        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getOrders, getMyOrders, createOrder };
