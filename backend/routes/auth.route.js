// Importing the Express framework to create a router
import express from 'express';

// Importing controller functions from auth-controller.js for handling authentication-related routes
import { google, signOut, signin, signup } from '../controllers/auth-controller.js';

// Creating an instance of Express Router
const router = express.Router();

// POST route for user signup
router.post('/signup', signup);

// POST route for user signin
router.post('/signin', signin);

// POST route for Google OAuth authentication
router.post('/google', google);

// GET route for user signout
router.get('/signout', signOut);

// Exporting the router to be used in other parts of the application
export default router;
