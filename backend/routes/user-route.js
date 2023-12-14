import express from 'express';
import * as userController from '../controllers/user-controller.js'; // Import the user controller
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// GET all users and POST a new user
router.route('/:id')
  .get(verifyToken,userController.getUser) // Handle GET request to retrieve all users
 // Handle POST request to create a new user

// Route to add a new user
router.route('/add')
  .post(userController.create); // Handle POST request to create a new user

// Update a user by ID
router.route('/update/:id')
  .put(verifyToken,userController.updateById);


// DELETE a user by ID
router.route('/delete/:id')
  .delete(verifyToken,userController.deleteById); // Handle DELETE request to remove a user by ID

  router.route('/listing/:id')
  .get(verifyToken,userController.getUserListings); 

  router.route('/:id')
  .get(verifyToken,userController.getUser); 

  router.route('/')
  .get(verifyToken,userController.getUser); 
// Test route
router.route('/test')
  .get((req, res) => res.send('Testing')); // Handle GET request for testing purposes

export default router;