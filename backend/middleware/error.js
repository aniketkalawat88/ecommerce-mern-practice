const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {  // Error Middleware 
    err.statusCode = err.statusCode || 500;   // Internal Server Error
    err.message = err.message || 'Internal Server Error'; // Default message for error
    res.status(err.statusCode).json({  // Send error response to client means frontend 
        success: false,
        error: err
    })
}