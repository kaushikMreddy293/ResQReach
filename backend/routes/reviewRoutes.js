// Importing the Express framework to create a router
import express from 'express';

// Importing controller functions from review-controller.js for handling review-related routes
import * as reviewController from '../controllers/review-controller.js';

// Creating an instance of Express Router
const router = express.Router();

// Route for creating a new review or finding reviews (POST /reviews, GET /reviews)
router.route('/')
    .post(reviewController.post) // POST request to create a new review
    .get(reviewController.find); // GET request to find all reviews

// Route for deleting a specific review by ID (DELETE /reviews/:id)
router.route('/:id')
    .delete(reviewController.remove); // DELETE request to remove a review by ID

// Exporting the router to be used in other parts of the application
export default router;
