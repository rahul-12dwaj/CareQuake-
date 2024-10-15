const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorizeRole = (requiredRole) => {
    return async (req, res, next) => {
        // Verify the token
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided, authorization denied.' });
        }

        try {
            // Decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user info to request

            // Fetch user from the database
            const user = await User.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Check if user has the required role
            if (user.role !== requiredRole) {
                return res.status(403).json({ error: 'Access denied: insufficient permissions.' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(500).json({ error: 'Failed to authenticate token.' });
        }
    };
};


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user information to the request
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authorizeRole;
module.exports = authMiddleware;
