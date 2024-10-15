// backend/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error (you can enhance this to log to a file or monitoring system)
    console.error(err);

    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
