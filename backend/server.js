// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const campaignRoutes = require('./routes/campaigns');
const userRoutes = require('./routes/users');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler'); // Import the error handling middleware
const contributionRoutes = require('./routes/contributions');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Define routes
app.use('/api/campaigns', campaignRoutes); // Campaign routes
app.use('/api/users', userRoutes); // User routes

// Error Handling Middleware (should be last)
app.use(errorHandler); // Add the error handling middleware

app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contributions', contributionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
