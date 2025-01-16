const mongoose = require("mongoose");

const connectDatabase = async () => {
  // try {
    const data = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB connected with host: ${data.connection.host}`);
  // } catch (error) {
  //   console.log(error , "Database connection failed");
    
  // }
};

module.exports = connectDatabase;