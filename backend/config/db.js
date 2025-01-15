const mongoose = require("mongoose");

const connectDatabase = async () => {
  // try {
    const data = await mongoose.connect("mongodb://localhost:27017/Ecommerce");
    console.log(`MongoDB connected with host: ${data.connection.host}`);
  // } catch (error) {
  //   console.log(error , "Database connection failed");
    
  // }
};

module.exports = connectDatabase;