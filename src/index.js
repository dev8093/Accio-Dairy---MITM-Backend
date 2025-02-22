import dotenv from "dotenv"; // Module for handling environment variables
import { app } from "./app.js"; // Custom app module
import mongoose from "mongoose"; // MongoDB library
import connectDb from "./db/index.js"; // Custom database connection module

// Import necessary modules

// Load environment variables from .env file
dotenv.config({
    path: './env'
});

// Connect to the database
connectDb()
    .then(() => {
        // Start the server
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at Port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db Connection failed ", err);
        app.on("error", (error) => {
            console.error("Server error:", error);
            throw error;
        });
    });

/** 
 * Alternative approach to connect with the database
 * 
 * import express from "express"
 * const app = express();
 * ( async () => {
 *     try {
 *         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
 *         app.on("error",(error)=>{
 *             console.error("Database connection error:", error);
 *             throw error;
 *         })
 *         
 *         app.listen(process.env.PORT)
 *         
 *     } catch(error){
 *         console.error("Error connecting to the database:", error);
 *         throw error;
 *     }
 *     
 * })()
 */
