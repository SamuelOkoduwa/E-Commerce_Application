// middleware/adminMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as needed

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = adminMiddleware;
