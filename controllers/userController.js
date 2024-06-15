const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            username,
            email,
            password,
            verificationToken: crypto.randomBytes(20).toString('hex')
        });

        await user.save();

        const verifyUrl = `http://${req.headers.host}/api/users/verifyemail/${user.verificationToken}`;

        const message = `Thank you for registering at Youthrive E-commerce Site! 
                         To complete your registration and activate your account, please verify your email address by clicking the link below: \n\n ${verifyUrl}`;

        await sendEmail({
            email: user.email,
            subject: 'Email Verification',
            message
        });

        res.status(201).json({
            message: 'User registered successfully. Please check your email to verify your account.'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        // Send welcome email
        const welcomeMessage = `Hi ${user.username} 
        Welcome to our Youthrive e-commerce site,! 
        We’re thrilled to have you join our community. At Youthrive E-commerce, we strive to provide you with the best shopping experience, from a wide variety of products to exceptional customer service.

        Here's what you can look forward to:
        * Exclusive Deals: Be the first to know about our latest promotions and discounts.
        * Personalized Recommendations: Enjoy a shopping experience tailored to your preferences.
        * Easy Returns: Shop with confidence knowing that our hassle-free return policy has got you covered..`;
    
        await sendEmail({
            email: user.email,
            subject: 'Welcome to Our E-commerce Site',
            message: welcomeMessage
        });

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please verify your email before logging in' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.verificationToken = crypto.randomBytes(20).toString('hex');
        await user.save();

        const resetUrl = `http://${req.headers.host}/api/users/resetpassword/${user.verificationToken}`;

        const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please click on the following link, or paste this into your browser to complete the process:\n\n ${resetUrl}`;

        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        });

        res.json({ message: 'Email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.password = password;
        user.verificationToken = undefined;
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, verifyEmail, loginUser, forgotPassword, resetPassword };
