import Guide from '../models/guides.js';

// function to search for guides based on provided parameters
export const search = async (params = {}) => {
    // Use the Guide model to find documents that match the given parameters and execute the query
    const guides = await Guide.find(params).exec();
    return guides; // Return the found guides
}

// function to save a new guide to the database
export const save = async (newGuide) => {
    // Create a new Guide instance with the provided new guide data
    const guide = new Guide(newGuide);
    return await guide.save(); // Save the new guide to the database and return the result
}

// function to find a specific guide by its ID
export const find = async (id) => {
    // Use the Guide model to find a single guide by its ID and execute the query
    const guide = await Guide.findById(id).exec();
    return guide; // Return the found guide
}

// function to fetch guides by category
export const findByCategory = async (category) => {
    // Use the Guide model to find documents that match the given category and execute the query
    const guides = await Guide.find({ category: category }).exec();
    return guides; // Return the found guides
}


// function to update an existing guide identified by its ID
export const update = async (updatedGuide, id) => {
    // Update the guide with the given ID using the new data and execute the query
    const guide = await Guide.findByIdAndUpdate(id, updatedGuide).exec();
    return guide; // Return the updated guide
}

// function to remove a guide from the database based on its ID
export const remove = async (id) => {
    // Use the Guide model to find a guide by its ID and delete it, then execute the query
    return await Guide.findByIdAndDelete(id).exec();
}
