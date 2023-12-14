// Importing the response object from Express for type-checking
import { response } from "express";

// Function to handle success response with provided data
export const successResponse = (data, response) => {
    response.status(200)
        .json(data);  // Sending a JSON response with a 200 status code and the provided data
}

// Function to handle error response with a default error message
export const errorResponse = (err, response) => {
    response.status(500)
        .json({
            code: "Service Error",
            message: "Error occurred while processing your request.",  // Default error message for internal server error
        });
}

// Function to handle success response for deletion with provided data
export const deleteResponse = (data, response) => {
    response.status(200)
        .json(data);  // Sending a JSON response with a 200 status code and the provided data
}

// Function to handle success response for update with provided data
export const updateResponse = (data, response) => {
    response.status(200)
        .json(data);  // Sending a JSON response with a 200 status code and the provided data
}
