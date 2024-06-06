const express = require('express');
const dotenv = require('dotenv').config();


const app = express();

// Server static assets if in production
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

