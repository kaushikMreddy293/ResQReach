import * as guideService from '../services/guide-service.js'
import { successResponse, errorResponse, deleteResponse } from './response-handler.js'

// Defining response messages for different operations
const guideAddedMessage = "Guide Created Successfully.";
const guideDeletedMessage = "Guide Deleted Successfully."
const guideUpdateMessage = "Guide Updated Successfully."

// Controller function to find guides based on query parameters
export const find = async (request, response) => {
    try {
        const params = {...request.query}; // Extract query parameters from the request
        const guides = await guideService.search(params); // Call the search service with these parameters
        successResponse(guides, response); // Send a successful response with the guide data
    } catch (err) {
        errorResponse(err, response); // Handle any errors
    }
}

// Controller function to find guides by category
export const findByCategory = async (request, response) => {
    try {
        const category = request.params.category;
        const guides = await guideService.findByCategory(category);
        successResponse(guides, response); // Send a successful response with the guide data
    } catch (error) {
        errorResponse(err, response); // Handle any errors
    }
}

// Controller function to create a new guide
export const post = async (request, response) => {
    try {
        const newGuide = {...request.body}; // Extract the new guide data from the request body
        await guideService.save(newGuide); // Save the new guide using the guide service
        successResponse(guideAddedMessage, response); // Send a success response
    } catch (err) {
        console.error(err); // Log the error for debugging
        errorResponse(err, response); // Send an error response
    }
}

// Controller function to search and get a guide by ID
export const get = async (request, response) => {
    try {
        const id = request.params.id; // Extract the guide ID from the request parameters
        const guide = await guideService.find(id); // Retrieve the guide using the guide service
        successResponse(guide, response); // Send the retrieved guide in the response
    } catch (err){
        errorResponse(err, response); // Handle any errors
    }
}

// Controller function to update a guide by ID
export const put = async (request, response) =>{
    try {
        const id = request.params.id; // Extract the guide ID from the request parameters
        const updatedGuide = {...request.body}; // Extract the updated guide data from the request body
        await guideService.update(updatedGuide, id); // Update the guide using the guide service
        successResponse(guideUpdateMessage, response); // Send a success response
    } catch (err){
        errorResponse(err, response); // Handle any errors
    }
}

// Controller function to delete a guide by ID
export const remove = async (request, response) => {
    try {
        const id = request.params.id; // Extract the guide ID from the request parameters
        await guideService.remove(id); // Delete the guide using the guide service
        deleteResponse(guideDeletedMessage, response); // Send a delete success response
    } catch (err){
        errorResponse(err, response); // Handle any errors
    }
}
