import FeedShare from "../models/feedShare.js";

//GET service to get all the foods to Display using mongoose function
    export const getAllLeftoverFood = async () => {
        try {
            const leftoverFoods = await FeedShare.find();
            return leftoverFoods;
        } catch (error) {
            throw error;
        }
    };

//POST service to add any new Left over to Display using mongoose function
    export const postLeftoverFood = async (newLeftoverFood) => {
    try {
        //const createdLeftoverFood = await FeedShare.create(newLeftoverFood);
        const createdLeftoverFood = new FeedShare(newLeftoverFood);
        return await createdLeftoverFood.save();
    } catch (error) {
        throw error;
    }
    };

//GET service to get the specific foods ID to Display using mongoose function
    export const getLeftoverFoodById = async (id) => {
    try {
        const leftoverFood = await FeedShare.findById(id);
        return leftoverFood;
    } catch (error) {
        throw error;
    }
    };

//PUT service to update the foods Specifications for Specific Food ID using mongoose function
    export const updateLeftoverFood = async (id, updatedLeftoverFood) => {
    try {
        const updatedFood = await FeedShare.findByIdAndUpdate(
        id,
        updatedLeftoverFood,
        { new: true }
        );
        updatedFood.Updated_date = new Date(); // Set Updated_date
        return updatedFood;
    } catch (error) {
        throw error;
    }
    };

//DELETE service to delete the food Items from Display by specific ID using mongoose function
    export const deleteLeftoverFood = async (id) => {
    try {
        await FeedShare.findByIdAndDelete(id);
        return { message: "Leftover food deleted successfully" };
    } catch (error) {
        throw error;
    }
    };

//GET service to filter all the foods on the Display based on specific filters using mongoose function
    export const filterLeftoverFood = async (name) => {
    try {
        const filteredLeftoverFood = await FeedShare.find({
        name: { $regex: new RegExp(name, "i") },
        });
        return filteredLeftoverFood;
    } catch (error) {
        throw error;
    }
    };

//GET service to get all the reviews for the specific food based on Food ID using mongoose function
    export const getAllReviews = async (id) => {
    try {
        const leftoverFood = await FeedShare.findById(id);
        if (!leftoverFood) {
        throw { status: 404, message: "Leftover food not found" };
        }
        return leftoverFood.reviews;
    } catch (error) {
        throw error;
    }
    };

//POST service to add/give the review for the specific food based the food ID using mongoose function
    export const postReview = async (id, newReview) => {
    try {
        const leftoverFood = await FeedShare.findById(id);
        if (!leftoverFood) {
        throw { status: 404, message: "Leftover food not found" };
        }
        leftoverFood.reviews.push(newReview);
        await leftoverFood.save();
        return newReview;
    } catch (error) {
        throw error;
    }
    };

//PUT service to update the number of people ready to collect the food for Specific Food ID using mongoose function
    export const markAsGoing = async (id, isGoing) => {
    try {
        const foodItem = await FeedShare.findById(id);
        if (!foodItem) {
        throw { status: 404, message: "Leftover food not found" };
        }

        // If isGoing is true, increment the count; if false, decrement the count
        foodItem.is_going_count += isGoing ? 1 : -1;
        foodItem.Updated_date = new Date(); // Set Updated_date
        await foodItem.save();
        return foodItem;
    } catch (error) {
        throw error;
    }
    };