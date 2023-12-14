// Importing the Express framework to create a router
import express from 'express';

// Importing controller functions from feed-ShareController.js for handling feed and share-related routes
import { createListing, deleteListing, updateListing, getListing, getAllListing, getEmails } from '../controllers/feed-ShareController.js';

// Importing a middleware function for verifying user tokens from verifyUser.js
import { verifyToken } from '../utils/verifyUser.js';

// Creating an instance of Express Router
const router = express.Router();

// Route for creating a new listing with token verification
router.post('/create', verifyToken, createListing);

// Route for deleting a listing with token verification
router.delete('/delete/:id', verifyToken, deleteListing);

// Route for updating a listing with token verification
router.post('/update/:id', verifyToken, updateListing);

// Route for retrieving a specific listing
router.get('/get/:id', getListing);

// Route for retrieving all listings
router.get('/alllistings', getAllListing);

// Route for retrieving all email addresses
router.get('/all-emails', getEmails);

// Exporting the router to be used in other parts of the application
export default router;
