const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")


// app.use(cors())
app.use(
    cors({
      origin: "http://localhost:3000", // Replace with your frontend URL
      credentials: true, // Allow cookies to be sent
    })
  );

const errorMiddleware = require('./middleware/error');
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())

// Routes import 
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute')

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)



// Middleware to handle errors
app.use(errorMiddleware)



app.use("*", (req,res) => {
    res.status(404).json({message: 'page not found'});
})


module.exports = app;  // Export app for other modules to use