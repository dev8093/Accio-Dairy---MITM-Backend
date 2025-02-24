import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema({
    title: {
        type: String,
        required: [true, "Meeting must have title"],
    },
    
    description: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A creator must initiate a meeting"]
    },
    status: {
        type: String,
        enum: ["draft", "active", "completed", "cancelled"],
        required: true,
        default: "draft"
    },
    startTime: {
        type: Date,
        required: [true, "Start time is required"],
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: "Start time must be in the future"
        }
    },
    endTime: {
        type: Date,
        required: [true, "End time is required"],
        validate: {
            validator: function(value) {
                return value > this.startTime;
            },
            message: "End time must be after start time"
        }
    },
    participants: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            status: {
                type: String,
                enum: [ "invited", "accepted", "declined" ],
                default: "invited"
            },
            startLocation: {
                latitude: { type: Number },
                longitude: { type: Number },
                address: { type: String }
            }
        }
    ],
    meetingLocation: {
        latitude: { type: Number },
        longitude: { type: Number },
        address: { type: String }
    }

}, { timestamps: true });

export const Meeting = mongoose.model("Meeting", meetingSchema);