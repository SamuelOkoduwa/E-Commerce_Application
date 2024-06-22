const express = require('express');
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart)
    .put(protect, updateCartItem)
    .delete(protect, removeFromCart);

module.exports = router;


