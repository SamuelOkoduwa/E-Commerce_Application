const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db'); // Import connectDB function
const morgan = require('morgan'); // Import morgan
const userRoutes = require('./routes/userRoutes');
const { router: categoryRoutes } = require('./routes/categories'); // Import the category routes
const cors = require('cors');

// Initialize express
const app = express();

// Enable CORS
app.use(cors());
app.options('*', cors());

// Connect to database
connectDB();

// Middleware
app.use(express.json()); // Body parser
app.use(morgan('tiny')); // Morgan

// API routes
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

app.get('/api', (req, res) => {
    res.send('Hello World');
});

// Server static assets if in production
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
