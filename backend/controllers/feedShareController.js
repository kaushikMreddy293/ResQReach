import { request, response } from 'express'
import * as feedShareService from '../services/feedShareService.js'
import {successResponse, errorResponse, deleteResponse} from './response-handler.js'

const reportAddedMessage = "Report Created Successfully.";
const reportDeletedMessage = "Report Deleted Successfully."

//To get all the remaining food Controller
export const getAllLeftoverFood = async (request, response) => {

    try {
        const leftoverFood = await feedShareService.getAllLeftoverFood();
        successResponse(leftoverFood, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To post any new left over-food items Controller
export const postLeftoverFood = async (request, response) => {

    try {
        const newLeftoverFood = {...request.body};
        const createdLeftoverFood = await feedShareService.postLeftoverFood(newLeftoverFood);
        successResponse(createdLeftoverFood, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To get any left over food by specific ID Controller
export const getLeftoverFoodById = async (request, response) => {

    try {
        const  id = request.params.id;
        const leftoverFood  = await feedShareService.getLeftoverFoodById(id);
        successResponse(leftoverFood, response);
    } catch (error) {
        errorResponse(error,response);
    }
}

//To Update any information for a specific Food ID Controller
export const updateLeftoverFood = async (request, response) => {

    try {
        const id = request.params.id;
        const updatedLeftoverFood  = await feedShareService.updateLeftoverFood(id, request.body);
        successResponse(updatedLeftoverFood, response);
    } catch (error) {
        errorResponse(error,response);
    }
}

//Delete any left over food by specific ID Controller
export const deleteLeftoverFood = async (request, response) => {

    try {
        const id = request.params.id;
        const deleteLeftoverFood = await feedShareService.deleteLeftoverFood(id);
        deleteResponse(deleteLeftoverFood, response);
    } catch (error) {
        errorResponse(error,response);
    }
}

// Filter the Food Items by Specific Category Controller
export const filterLeftoverFood = async (request, response) => {

    try {
        const name = request.query;
        const filteredLeftoverFood = await feedShareService.filterLeftoverFood(id);
        successResponse(filteredLeftoverFood, response);
    } catch (error) {
        errorResponse(error,response);
    }
}

// Get all the reviews for the Specific Food Item Controller
export const getAllReviews = async (request, response) => {

    try {
        const id = request.params.id;
        const reviews = await feedShareService.getAllReviews(id);
        successResponse(reviews, response);
    } catch (error) {
        errorResponse(error,response);
    }
}

// Post an review for the food item Controller
export const postAllReviews = async (request, response) => {

    try {
        const id = request.params.id;
        const newReview = { ...request.body };
        const createdReview = await postAllReviews(id, newReview);
        successResponse(createdReview, response);
    } catch (error) {
        errorResponse(error,response);
    }
}

//
// Add a new controller function for marking as going
export const markAsGoing = async (request, response) => {
    try {
        const id = request.params.id;
        const isGoing = request.body.isGoing; // Assuming a boolean value is sent in the request body
        const updatedFoodItem = await markAsGoing(id, isGoing);
        successResponse(updatedFoodItem, response);
    } catch (error) {
        errorResponse(error, response);
    }
};
