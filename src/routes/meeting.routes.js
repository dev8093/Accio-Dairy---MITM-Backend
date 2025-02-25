import express, { Router } from 'express'
import { Meeting } from '../models/meeting.model.js';
const router = Router();

// console.log("asds", router)

router.post("/create", async (req, res) => {
    try {
        const { title, description, creator } = req.body;
        if (!title || !description || !creator) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const newMeeting = new Meeting({
            title, description, creator
        })

        await newMeeting.save();
        res.status(200).json({ message: "Meeting created successfully" })
    } catch (error) {
        console.log(error)
    }
})

export default router