import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
},
{
    versionKey: false // Disable versioning for this schema (no __v field will be added to documents)
}
);

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
