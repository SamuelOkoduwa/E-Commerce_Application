const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');	// Import connectDB function
const morgan = require('morgan');	// Import morgan
const mongoose = require("mongoose") //import mongoose
const userRoutes = require('./routes/userRoutes');
const {router} = require('./routes/categories')
const cors = require('cors');



// Initialize express
const app = express();

// Enable CORS
app.use(cors());
app.options('*', cors());

// Connect to database
// Function to connect to DB
connectDB()

// Middleware
app.use(express.json());	// Body parser
app.use(morgan('tiny'));	// Morgan

// API routes
app.get('/api', (req, res) => {
	res.send('Hello World');
});


// Use routes
app.use('/api/users', userRoutes);
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/categories', require('./routes/categoryRoutes'));


// Server static assets if in production
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

