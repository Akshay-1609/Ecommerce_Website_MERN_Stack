const app = require('./app');
const dotenv= require('dotenv');
const connectDatabase = require('./config/database');
const ErrorHandler = require('./utils/errorHandler');
// Config
dotenv.config({path:"backend/config/config.env"});

// connect to database
connectDatabase()

const server =app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

// Unhandled Promise rejection
process.on("UnhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server due to unhandled promises Rejection');
    server.close(()=>{
        process.exit(1);
    });
});


//Handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
     console.log('Shutting down the server due to uncaught Exception');
     process.exit(1);
}) 