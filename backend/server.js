
import express from 'express'; // Importing the Express framework for creating the server
import initialize from './app.js'; // Importing the initialize function from app.js for application setup

import cors from 'cors'; // Importing CORS (Cross-Origin Resource Sharing) to allow cross-domain requests
import mongoose from 'mongoose';

// Creating an Express application instance
const app = express();

// Defining the port on which the server will listen, defaulting to 3000 if not set in environment variables
const port = process.env.PORT || 3001;

// Calling the initialize function to configure and set up the app, passing the Express app instance
initialize(app);

// Starting the server to listen on the defined port and logging a message to the console when it starts
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
