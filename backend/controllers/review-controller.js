import * as ReviewService from '../services/review-service.js';
import { successResponse, errorResponse, deleteResponse } from './response-handler.js'

// Defining response messages for different operations
const guideAddedMessage = "Review Created Successfully.";
const guideDeletedMessage = "Review Deleted Successfully."
const guideUpdateMessage = "Review Updated Successfully."
// Controller function to find guides based on query parameters
export const find = async (request, response) => {
    try {
        const params = {...request.query}; // Extract query parameters from the request
        const guides = await ReviewService.getAllReviews(params); // Call the search service with these parameters
        successResponse(guides, response); // Send a successful response with the guide data
    } catch (err) {
        errorResponse(err, response); // Handle any errors
    }
}

// Controller function to create a new guide
export const post = async (request, response) => {
    try {
        const newGuide = {...request.body}; // Extract the new guide data from the request body
        await ReviewService.save(newGuide); // Save the new guide using the guide service
        successResponse(guideAddedMessage, response); // Send a success response
    } catch (err) {
        console.error(err); // Log the error for debugging
        errorResponse(err, response); // Send an error response
    }
}

// Controller function to delete a guide by ID
export const remove = async (request, response) => {
    try {
        const id = request.params.id; // Extract the guide ID from the request parameters
        await ReviewService.remove(id); // Delete the guide using the guide service
        deleteResponse(guideDeletedMessage, response); // Send a delete success response
    } catch (err){
        errorResponse(err, response); // Handle any errors
    }
}
  
