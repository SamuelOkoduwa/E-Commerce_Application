// routes/authRoutes.js
const express = require('express');
const { registerUser, verifyEmail, loginUser, forgotPassword, resetPassword } = require('../controllers/userController');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', registerUser);

router.get('/verifyemail/:token', verifyEmail);

router.post('/login', loginUser);

router.post('/forgotpassword', forgotPassword);

router.put('/resetpassword/:token', resetPassword);

module.exports = router;
