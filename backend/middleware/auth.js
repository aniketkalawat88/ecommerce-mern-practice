const User = require("../models/userModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncError( async(req , res , next) => {
    const { token } = req.cookies;    /// token humne cookies m store kiya h toh use access kr rhe h
    // console.log(token);

    if(!token){
        return next(new ErrorHander("Please login to access this resource" , 401))
    }

    const decodedData = jwt.verify( token , process.env.JWT_SECRET)
    req.user =  await User.findById(decodedData.id);
    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res , next ) => {
        if(!roles.includes(req.user.role)){
            return next (new ErrorHander(`Role : ${req.user.role} is not allowed to access this response` ,403))
        } 
        next();
    }
}