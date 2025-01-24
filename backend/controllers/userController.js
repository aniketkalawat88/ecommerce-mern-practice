const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary")



// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
        folder: "avatars",
        width:150,
        crop:"scale"
    })
    console.log("myCloud", myCloud)
    const { name , email , password } = req.body;
    const user = await User.create({
        name , 
        email,
        password,
        avatar : {
            public_id : myCloud.public_id,
            url : myCloud.secure_url
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
    
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex"); 

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHander("Reset password token is invalid or has been expired" , 400));
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHander("Password doesnt match" , 400));
    }
    
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user ,200 , res)
})


// Get user detail
exports.getUserDetails = catchAsyncError( async (req ,res, next) => {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success:true,
        user
    })
})
    
// update user password
exports.updatePassword = catchAsyncError( async (req ,res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHander("Old password is incorrect" , 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not match" , 400));
    }

    user.password = req.body.newPassword;

    await user.save()
    
    sendToken(user, 200 , res);
    
    // res.status(200).json({
    //     success:true,
    //     user
    // })

})
    
    
// update user profile
exports.updateProfile = catchAsyncError( async (req ,res, next) => {
    const newUserData = {
        name: req.body.name,
        email:req.body.email
    }
    
    // we will add clodinary later

    const user = await User.findByIdAndUpdate(req.user.id , newUserData, {
        new :true,
        runValidators : true,
        useFindAndModify:false
    });
    
    res.status(200).json({
        success:true,
        user
    })
    // sendToken(user, 200 , res);
})


// get all user ( admin )
exports.getAllUser = catchAsyncError( async(req ,res , next) => {
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

// get single user ( admin )
exports.getSingleUser = catchAsyncError( async(req ,res , next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander(`user doesnot exit with id ${req.params.id} ` , 400));
    }

    res.status(200).json({
        success:true,
        user
    })
})


// update user Role   --- Admin
exports.updateUserRole = catchAsyncError( async (req ,res, next) => {
    const newUserData = {
        name: req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    
    const user = await User.findByIdAndUpdate(req.params.id , newUserData, {
        new :true,
        runValidators : true,
        useFindAndModify:false
    });
    
    res.status(200).json({
        success:true,
        user
    })
    // sendToken(user, 200 , res);
})

// delete User  --- Admin
exports.deleteUser = catchAsyncError( async (req ,res, next) => {

    
    const user = await User.findByIdAndDelete(req.params.id )

    // we will remove clodinary later

    if(!user){
        return next(new ErrorHander(`User does not exist with id : ${req.params.id}` , 400));
    }

    // await user.remove();
    
    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
})

