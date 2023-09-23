import express from 'express'
import { studentLogin } from '../controllers/studentController';

const router = express.Router();

//Login Post
router.post('/login', studentLogin);


export default router;