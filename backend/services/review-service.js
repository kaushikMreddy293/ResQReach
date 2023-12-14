//Import the Blog model for MongoDB interactions.
import Review from '../models/review.js';

// function to save a new guide to the database
export const save = async (newReview) => {
  // Create a new review instance with the provided new guide data
  const review = new Review(newReview);
  return await review.save(); // Save the new guide to the database and return the result
}

// function to remove a guide from the database based on its ID
export const remove = async (id) => {
  // Use the Guide model to find a guide by its ID and delete it, then execute the query
  return await Review.findByIdAndDelete(id).exec();
}

// function to get all the Reviews 
export const getAllReviews = async(params = {}) => {
  const reviews = await Review.find(params).exec();
  return reviews;
}

