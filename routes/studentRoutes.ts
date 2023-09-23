import express from "express";
import {
  bookSlot,
  getAvailableSlots,
  studentLogin,
} from "../controllers/studentController";
import { authenticateStudent } from "../middleware/authMiddleware";

const router = express.Router();

//Login Post
router.post("/login", studentLogin);

//Get Available Slots /DeanId/DeanSlots
router.get("/:deanId/availableSlots", authenticateStudent, getAvailableSlots);

//POST Book a slot
router.post("/bookSlot/:deanId", authenticateStudent, bookSlot);

export default router;
