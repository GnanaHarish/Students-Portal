import express from 'express'
import { deanLogin, getBookedSlot } from '../controllers/deanController';

const router = express.Router();

//Login Post
router.post('/login', deanLogin);

//Get Booked Slots
router.get("/getBookedSlots/:deanId", getBookedSlot);


export default router;