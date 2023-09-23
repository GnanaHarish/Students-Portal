import Student from "../models/Student";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

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
      console.log(student.password);
      const passwordMatch = await bcrypt.compare(password, student.password);
      console.log(password);
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
