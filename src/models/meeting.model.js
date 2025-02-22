import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema({
    title: {
        type: String,
        required: [true, "Meeting must have title"],
    },
    
    description: String,
    creator: {
        // type: Schema.Types.ObjectId,
        // ref: "User",
        type: String,
        required: [true, "A creator must initiate a meeting"]
    },
    status: {
        type: String,
        enum: ["draft", "active", "completed", "cancelled"],
        required: true,
        default: "draft"
    },
    

})

export const Meeting = mongoose.model("Meeting", meetingSchema);