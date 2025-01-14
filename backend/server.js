const app = require('./app');

// Setting up config file
const dotenv = require('dotenv');
const connectDatabase = require('./config/db');


dotenv.config({ path: "backend/config/config.env" });


// connecting to database
connectDatabase();


port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
