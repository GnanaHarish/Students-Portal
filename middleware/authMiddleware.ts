import { Response, NextFunction } from "express";
import Student from "../models/Student";
import Dean from "../models/Dean";

export async function authenticateStudent(req: any, res: Response, next: NextFunction){
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({message: "You are not authorized"});
    }

    try {
        
        const student = await Student.findOne({token});
        if(!student){
            return res.status(401).json({message: "You are not authorized"});
        }
        req.student = student;
        next();
    } catch (error: unknown) {
        console.log("Error", error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export async function authenticateDean(req: any, res: Response, next: NextFunction){
    const token = req.headers.authorization?.replace('Bearer', '');

    if(!token){
        return res.status(401).json({message: "You are not authorized"});
    }

    try {
        const student = await Dean.findOne({token});
        if(!student){
            return res.status(401).json({message: "You are not authorized"});
        }
        req.student = student;
        next();
    } catch (error: unknown) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}