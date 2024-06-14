// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' });
      }

      req.user = user;

      next();
    });
  } catch (error) {
    console.error('Authentication Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;
