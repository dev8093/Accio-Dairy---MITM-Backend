import { Meeting } from "../models/meeting.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


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