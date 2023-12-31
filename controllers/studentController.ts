import Student from "../models/Student";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import Session from "../models/Session";
import mongoose from "mongoose";

//POST
export async function studentLogin(req: any, res: any) {
  const { universityId, password } = req.body;
  try {
    const student = await Student.findOne({
      universityId: universityId,
    });

    if (!student) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const token = uuidv4();
      const newStudent = new Student({
        universityId: universityId,
        password: hashedPassword,
        token: token,
      });

      await newStudent.save();
      return res.status(200).json({ message: "Student Added successfully" });
    } else {
      const passwordMatch = await bcrypt.compare(password, student.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "You are not authorized to login" });
      }
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
}

//GET get available slots
export async function getAvailableSlots(req: any, res: any) {
  const { deanId } = req.params;
  try {
    const availableSessions = await Session.find(
      {
        deanAvailable: true,
        dean: deanId,
      },
      {
        deanAvailable: 0,
        _id: 0,
      }
    ).populate("dean", "-_id universityId");

    if (!availableSessions) {
      return res
        .status(200)
        .json({ message: "No available sessions for the mentioned dean" });
    }

    return res.status(200).json(availableSessions);
  } catch (error: unknown) {
    console.log("Error in finding slot", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}

//POST book a slot

export async function bookSlot(req: any, res: any) {
  const { deanId } = req.params;
  const date = req.query.date;
  const regex = new RegExp("-", "g");
  const [day, month, year] = date.replace(regex, "/").split("/");
  const userDate = `${year}-${month}-${day}`;
  try {
    const studentId = req.student._id;
    const findBookingSlot = await Session.findOneAndUpdate(
      {
        date: userDate,
        dean: deanId,
        deanAvailable: true,
      },
      { $set: { deanAvailable: false, student: studentId } },
      {
        projection: {
          _id: 0,
          deanAvailable: 0, 
          student: 0, 
        },
        new: true,
      }
    );
    if (!findBookingSlot) {
      return res.status(404).json({ message: "Session not available" });
    }
    return res.status(200).json(findBookingSlot);
  } catch (error: unknown) {
    console.log("Error while Booking", error);
    res.status(500).json({ message: "Internal Error" });
  }
}
