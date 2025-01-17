const ErrorHander = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {  // Error Middleware 
    err.statusCode = err.statusCode || 500;   // Internal Server Error
    err.message = err.message || 'Internal Server Error'; // Default message for error


    // wrong Mongodb Id Error -> mean ab hum api call m jo bhi error aayenge hume show ho jayege
    if(err.name == "CastError"){
        const message = `Resource not found. Invalid : ${err.path}`
        err = new ErrorHander(message,  400)
    }

    // Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHander(message,  400) 
    }

    // Wrong JWT error
    if(err.code === "JsonWebTokenError"){
        const message = `Json web token is invalid , try again`
        err = new ErrorHander(message,  400) 
    }
    
    // JWT expires error
    if(err.code === "TokenExpiredError"){
        const message = `Json web token is expired , try again`
        err = new ErrorHander(message,  400) 
    }


    res.status(err.statusCode).json({  // Send error response to client means frontend 
        success: false,
        message: err.message,
    })
}
