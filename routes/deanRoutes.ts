import express from 'express'
import { deanLogin } from '../controllers/deanController';

const router = express.Router();

//Login Post
router.post('/login', deanLogin);


export default router;