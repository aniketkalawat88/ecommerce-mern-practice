const app = require('./app');

// Setting up config file
const dotenv = require('dotenv');
dotenv.config();

const connectDatabase = require('./config/db');

// Handling uncaught Exception
process.on("uncaughtException", err => {
    console.log(`Error ${err.message}`);
    console.log("Shutting down the server due to uncaught Exception");
    process.exit(1);
})


dotenv.config({ path: "backend/config/config.env" });


// connecting to database
connectDatabase();


port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// unhandled promise rejection -> mean when i got error for database i need that my databse will shutdown 
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection")

    //after that we shutdown our server
    server.close(() => {
        process.exit(1);
    })
    //ab hum db file mai error hta denge becuase yeh lg diya h
})


// console.log(youtube) //hume isme refernce error milega bcuz we not define so this type of error called uncaught error and ise hum sbse uper banege taki error phle hi mil jaye