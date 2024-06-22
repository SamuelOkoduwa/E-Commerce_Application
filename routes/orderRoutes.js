const express = require('express');
const { getOrders, getMyOrders, createOrder } = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, admin, getOrders)
    .post(protect, createOrder);

router.route('/myorders')
    .get(protect, getMyOrders);

module.exports = router;