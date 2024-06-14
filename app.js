const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');	// Import connectDB function
const morgan = require('morgan');	// Import morgan
const mongoose = require("mongoose") //import mongoose
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();

// Connect to database
// Function to connect to DB
connectDB()

// Middleware
app.use(express.json());	// Body parser
app.use(morgan('tiny'));	// Morgan

// API routes
app.get('/api', (req, res) => {
	res.status(200).json({message:"Welcome to Our E-commerce platform"});
});


// Use routes
app.use('/api/users', userRoutes);

// productRoute
app.use(express.json());
app.use('/api/product', productRoutes);

// Server static assets if in production
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});


