// Importing the Express framework to create a router
import express from 'express';

// Importing controller functions from donation-controller.js for handling donation-related routes
import * as donationController from '../controllers/donation-controller.js';

// Creating an instance of Express Router
const router = express.Router();

// Defining a route for handling donation payment
router.route('/payDonation')
    .post(donationController.donate);

// Exporting the router to be used in other parts of the application
export default router;
