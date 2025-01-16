const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name , email , password } = req.body;
    const user = await User.create({
        name , 
        email,
        password,
        avatar : {
            public_id : "this is a sample id",
            url : "profilepicurl"
        },
    })

    // const token = user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     // user
    //     token ,
    // })
    sendToken(user , 201, res)
});

// Login user
exports.loginUser = catchAsyncError(async (req, res , next) => {
    const { email , password } = req.body;

    // checking if user has a give email and password both
    if(!email || !password){
        return next(new ErrorHander("Please Enter Email and password", 400))
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password" , 401));
    }


    // const token = user.getJWTToken();
    // res.status(200).json({
    //     success:true,
    //     token
    // })

    sendToken(user , 200 , res)

})


exports.logout = catchAsyncError(async(req, res , next) => {

    res.cookie("token" , null  , {
        expires : new Date(Date.now()),
        httpOnly : true

    })
    res.status(200).json({
        success: true,
        message:"Logged Out Success"
    })
})