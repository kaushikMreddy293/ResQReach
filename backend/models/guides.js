import mongoose from "mongoose";

// Create a reference to the Mongoose Schema constructor, used to define the structure of documents within a collection
const Schema = mongoose.Schema;

// Define the schema for a 'preparedness guide' document
const preparednessGuideSchema = new Schema(
    {
        title: {
            type: String, // Specify the data type for the title field as a string
            required: true // This field is mandatory
        },
        content: {
            type: String, // Specify the data type for the content field as a string
            required: true // This field is mandatory
        },
        category: {
            type: String, // Specify the data type for the category field as a string
            required: true, // This field is mandatory
            enum: ['floods', 'earthquakes', 'wildfires', 'tornadoes', 'winters', 'other'], // Restrict the values of the category to a predefined set
        },
        updatedAt: {
            type: Date, // Specify the data type for the updatedAt field as a Date
            default: Date.now // Automatically set the value of this field to the current date and time when a document is created
        }
    },
    {
        versionKey: false // Disable versioning for this schema (no __v field will be added to documents)
    }
);

// Create a model from the schema
const PreparednessGuide = mongoose.model('PreparednessGuide', preparednessGuideSchema);

// Export the PreparednessGuide model for use in other parts of the application
export default PreparednessGuide;
