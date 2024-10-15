// backend/routes/users.js
const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/userController');
const authorizeRole = require('../middleware/roleMiddleware'); // Import the middleware
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// User registration - No role required
router.post('/register', register);

// User login - No role required
router.post('/login', login);

// Example route that requires a specific role
router.get('/some-protected-route', authorizeRole('admin'), (req, res) => {
    res.status(200).json({ message: 'Access granted to admin' });
});

// Get user profile - Authentication required
router.get('/profile', authMiddleware, getProfile);

// Update user profile - Authentication required
router.put('/profile', authMiddleware, updateProfile); // Protect the route with authMiddleware

module.exports = router;
