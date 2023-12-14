import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose'; // Importing Mongoose for MongoDB interactions
import dotenv from 'dotenv'; // Import the dotenv package to load environment variables from a .env file
import registerRouter from './routes/index.js';
import path from 'path';
import cookieParser from 'cookie-parser';
// Execute the configuration function of dotenv to make environment variables available
dotenv.config();

// Retrieve the MongoDB URI from the environment variables
const uri = process.env.ATLAS_URI;
const __dirname = path.resolve();
// Define an initialization function for the Express application
const initialize = (app) => {
    app.use(cors(
        {
            origin: 'http://localhost:3000',
            credentials: true,
        }
    ));
    // Use middleware to parse JSON bodies in requests
    app.use(express.json());
    // Use middleware to parse URL-encoded bodies (as sent by HTML forms)
    app.use(cookieParser());
    app.use(express.urlencoded());
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    // Connect to the MongoDB database using Mongoose with the provided URI
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('MongoDB database connection established successfully');
    });

    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
          success: false,
          statusCode,
          message,
        });})
    // Call the registerRouter function to set up the routes for the application
    registerRouter(app);
}

// Export the initialize function as a default export
export default initialize;
