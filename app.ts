import connectToDatabase from "./config/database";

import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import studentRoutes from './routes/studentRoutes';
import deanRoutes from './routes/deanRoutes';

//Configuration Environmental Variables
dotenv.config();
const PORT = process.env.PORT || 5101;

//Connecting to mongoDb
connectToDatabase();


//Configuring Express Server
const app = express();
app.use(express.json());
app.use(cors());


//Routes
app.use('/api/students', studentRoutes);
app.use('/api/deans', deanRoutes);  



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
