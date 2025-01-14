const express = require('express');
const app = express();

app.use(express.json());

// Routes import 
const product = require('./routes/productRoute');
const errorMiddleware = require('./middleware/error');

app.use("/api/v1", product)


// Middleware to handle errors
app.use(errorMiddleware)



app.use("*", (req,res) => {
    res.status(404).json({message: 'page not found'});
})


module.exports = app;  // Export app for other modules to use