import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB_NAME = "";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`, {
            minPoolSize: 5,
            maxPoolSize: 20,
            serverSelectionTimeoutMS: 5000,
        });///DB_NAME
        console.log(`\nConnected to MongoDB: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: error`);
        process.exit(1);
    }
};

export default connectDb;