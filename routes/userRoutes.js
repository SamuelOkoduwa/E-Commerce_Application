// routes/authRoutes.js
const express = require('express');
<<<<<<< HEAD
=======
const { registerUser, verifyEmail, loginUser, forgotPassword, resetPassword } = require('../controllers/userController');
>>>>>>> a2f6eb334a96fff7cc585dee2f094d01c40ce961
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

<<<<<<< HEAD
// User Registration and Login
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, action } = req.body;

    if (action === 'register') {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      return res.status(201).json({ message: 'User registered successfully' });
    } else if (action === 'login') {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return res.json({ token });
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Authentication Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
=======
router.post('/register', registerUser);

router.get('/verifyemail/:token', verifyEmail);

router.post('/login', loginUser);

router.post('/forgotpassword', forgotPassword);

router.put('/resetpassword/:token', resetPassword);
>>>>>>> a2f6eb334a96fff7cc585dee2f094d01c40ce961

module.exports = router;
