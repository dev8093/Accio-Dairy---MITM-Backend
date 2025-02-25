import { Meeting } from "../models/meeting.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createMeeting = asyncHandler(async (req, res) => {
    const { title, description, startTime, endTime, participants } = req.body;

    if(!title || !startTime || !endTime) {
        throw new ApiError(400, "All required fields must be provided")
    }

    const meeting = await Meeting.create({
        title,
        description,
        creator: req.user._id,
        startTime,
        endTime,
        participants: participants?.map(p => ({
            user: p.user,
            startLocation: p.startLocation
        }))
    });

    return res.status(201).json(new ApiResponse(201, meeting, "Meeting created successfuly"));
})

const getMeetingById = asyncHandler(async (req, res) => {
    const { meetingId } = req.params;

    const meeting = await Meeting.findById(meetingId)
        .populate('creator', 'name email')
        .populate('participants.user', 'name email');

    if(!meeting) throw new ApiError(404, "Meeting not found");
    
    return res.status(200).json(
        new ApiResponse(200, meeting, "Meeting fetched successfully")
    );
})

export {
    createMeeting,
    getMeetingById
};