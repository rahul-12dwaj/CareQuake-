const User = require('../models/User');

// Middleware to check user role
const checkUserRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            // Assuming the user ID is attached to req.user in a previous middleware (e.g., authMiddleware)
            const userId = req.user.userId;

            // Fetch user from the database
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Check if the user has the required role
            if (user.role !== requiredRole) {
                return res.status(403).json({ error: 'Access denied: insufficient permissions.' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };
};

module.exports = checkUserRole;
