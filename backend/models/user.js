import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      },
}, {
    timestamps: true,
    versionKey: false
});

const userModel = mongoose.model('User', userSchema); // 'User' will be the collection name in the database
export default userModel;