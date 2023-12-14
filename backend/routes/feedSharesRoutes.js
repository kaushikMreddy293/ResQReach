import express from 'express';
import * as feedShareController from '../controllers/feedShareController.js';

const router = express.Router();

// Define a route for the root path ('/') with a GET method
//To get all the remaining food
router.route('/')
.get(feedShareController.getAllLeftoverFood);

// Define a route for the root path ('/add') with a POST method
//To post any new left over-food items Controller
router.route('/add')
.post(feedShareController.postLeftoverFood);

// Define a route for the root path ('/:id') with a GET method
//To get any left over food by specific ID Controller
router.route('/:id')
.get(feedShareController.getLeftoverFoodById);

// Define a route for the root path ('/:id') with a PUT method
//To Update any information for a specific Food ID Controller
router.route('/:id')
.put(feedShareController.updateLeftoverFood);

// Define a route for the root path ('/:id') with a DELETE method
//Delete any left over food by specific ID Controller
router.route('/:id')
.delete(feedShareController.deleteLeftoverFood);

//
//
router.route('/collect/:id')
.put(feedShareController.markAsGoing);
// Define a route for the root path ('/filter') with a GET method
// Filter the Food Items by Specific Category Controller
router.route('/filter')
.get(feedShareController.filterLeftoverFood);

// Define a route for the root path ('/:id/reviews') with a GET method
// Get all the reviews for the Specific Food Item Controller
router.route('/:id/reviews')
.get(feedShareController.getAllReviews);

// Define a route for the root path ('/:id/reviews') with a POST method
// Post an review for the food item Controller
router.route('/:id/reviews')
.post(feedShareController.postAllReviews);

//Define a route for testing of the root path ('/') with a GET method
router.route('/test').get((req, res) => res.send('Testing'));


export default router;
