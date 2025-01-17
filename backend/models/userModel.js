const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
     name:{
        type: String,
        required : [true , "Please Enter your name"],
        maxLength:[30, "Name cannot exceed 30 characters"],
        minLength:[4, "Name greater than 4 characters"]
     },
     email:{
        type:String,
        required : [true , "Please Enter your Email"],
        unique:true,
        validate:[validator.isEmail , "Please enter a valid email"]
     },
     password:{
        type: String,
        required : [true , "Please Enter your password"],
        minLength:[8, "password greater than 8 characters"],
        select: false,   // without password we get all the data 
     },
     avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
     },
     role:{
        type: String,
        default:'user',
    },
    resetPasswordToken:String,
    resetPasswordExpire:String,
})


// Password hash or secure
userSchema.pre("save" , async function(next){
   if(!this.isModified("password")){
      next();
   }
   this.password = await bcrypt.hash(this.password, 10);

})

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
   return jwt.sign({id:this._id} , process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
   })
}


// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword , this.password)
}

// Generating password Reset token
userSchema.methods.getResetPasswordToken = function(){
   // Generating Token
   const resetToken = crypto.randomBytes(20).toString("hex");   // random byte genetrate kr dega buffer form mai but humne string hex diya hai to string m convert krke de dega

   // Hashing and adding resetPasswordToken to userSchema
   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");   //schema m add

   
   this.resetPasswordExpire = Date.now() + 15*60*1000;   // 15min mai expire ho jaye
   
   return resetToken;

}


 
module.exports = mongoose.model("User" , userSchema)