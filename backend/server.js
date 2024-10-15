// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const campaignRoutes = require('./routes/campaigns');
const userRoutes = require('./routes/users'); // Import user routes

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/carequakedev', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Use routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/users', userRoutes); // Use user routes

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

