import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import Dean from "../models/Dean";

export async function deanLogin(req: any, res: any) {
  const { universityId, password } = req.body;
  try {
    const dean = await Dean.findOne({
      universityId: universityId,
    });

    if (!dean) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const token = uuidv4();
      const newDean = new Dean({
        universityId: universityId,
        password: hashedPassword,
        token: token,
      });

      await newDean.save();
      return res.status(200).json({ message: "Dean Added successfully" });
    } else {
      const passwordMatch = await bcrypt.compare(password, dean.password);

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


