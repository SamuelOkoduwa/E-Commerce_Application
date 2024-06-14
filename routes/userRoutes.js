const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Route to handle user registration
router.post('/register', registerUser);

// Route to handle user login
router.post('/login', loginUser);

module.exports = router;