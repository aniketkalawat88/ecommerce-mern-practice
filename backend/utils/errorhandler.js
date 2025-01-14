class ErrorHandler extends Error {  //jab bhi error aayegi toh ye class call hogi and Error class ke saare properties and methods is class me inherit honge 
  constructor( message , statusCode) {  // Constructor function is called whenever a new instance of the class is created
    super(message);  // Call the super class constructor and pass in the message  // The super() method calls the parent class constructor
    this.statusCode = statusCode; // Set the statusCode property to the statusCode passed in the constructor 
    Error.captureStackTrace(this, this.constructor)  // Capture the stack trace
  }
}

module.exports = ErrorHandler;  // Export the ErrorHandler class so that other modules can use it