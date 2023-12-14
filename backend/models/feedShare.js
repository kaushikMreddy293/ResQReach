import mongoose from "mongoose";

    const feedShareSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    expiration_date: {
        type: Date,
    },
    is_going_count: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
        user: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
        },
        },
    ],
    Created_date:{
        type:Date,
        default:Date.now(),
    },
    Updated_date:{
        type:Date
    }
    });

    const FeedShare = mongoose.model('FeedShare', feedShareSchema);

    export default FeedShare;
