import mongoose from "mongoose";

const Schema = mongoose.Schema;
const reportSchema = new Schema({

    emergencyLevel: {
        type:String,
        required: true,
        enum: ['Low', 'Medium', 'High']
    },
    reportTitle: {
        type:String,
        required: true
    },
    reportContent: {
        type:String,
        required: true
    },
    reportLocation: {
        type:String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now

    }
}, {
    versionKey:false
})

const reportModel = mongoose.model('report', reportSchema);
export default reportModel;