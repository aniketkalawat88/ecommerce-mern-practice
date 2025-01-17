const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");



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


// Forget Password
exports.forgetPassword = catchAsyncError(async(req, res, next) => {
    const user = await User.findOne({email : req.body.email});   // first hum user searh krenge exist krta hai yaa nhi 
    if(!user){
        return next(new ErrorHander("User not found" , 404));
    }

    // Get Reset Password token
    const resetToken = user.getResetPasswordToken();   // reset token mil jayega jo humne function bnanya tha schema m getResetPasswordToken naam se

    await user.save({ validateBeforeSave : false});


    //mail send krna using nodemailer

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`   // http://localhost/api/v1/password/reset/${resetToken}

    const message = `Your reset Password token :- \n\n ${resetPasswordUrl} \n\nif you are not requested then, please ignored it`

    try{
        await sendEmail({   // sendEmail mai object pass kr diya 
            email:user.email,
            subject: `Ecommerce password recovery`,
            message,

        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave : false});
        return next(new ErrorHander(error.message , 500));
    }

})


// Reset Password
exports.resetPassword = catchAsyncError(async (req ,res , next) => {
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex"); 
    
})