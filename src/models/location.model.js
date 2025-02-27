import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    latitude:{
        type:Number,
        required:[true,"Must include latitude"],
        min: -90,
        max: 90
    },
    longitude:{
        type:Number,
        required:[true,"Must include longitude"],
        min: -180,
        max: 180
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: [true, 'User is required']
    },
    locationName:{
        type:String,
        default: 'Unnamed Location'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

})
export default mongoose.model("Location",locationSchema);
