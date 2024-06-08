const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;