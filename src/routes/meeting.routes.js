import { Router } from 'express'
import { Meeting } from '../models/meeting.model.js';
import { createMeeting, getMeetingById } from '../controllers/meeting.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';

const router = Router();

router.use(authenticate)

router.post("/", createMeeting);
router.get("/:meetingId", getMeetingById); 
// router.put("/:meetingId", )

export default router