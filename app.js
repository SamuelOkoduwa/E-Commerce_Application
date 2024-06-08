const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');	// Import connectDB function
const morgan = require('morgan');	// Import morgan

const app = express();

// Connect to database
connectDB();	// Call connectDB function

// Middleware
app.use(express.json());	// Body parser
app.use(morgan('tiny'));	// Morgan

// API routes
app.get('/api', (req, res) => {
	res.send('Hello World');
});

// Server static assets if in production
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

