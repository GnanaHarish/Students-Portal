import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import Dean from "../models/Dean";
import Session from "../models/Session";

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

//Get Booked Slot

export async function getBookedSlot(req: any, res: any) {
  const { deanId } = req.params;

  try {
    // const bookedSlots = await Session.find({
    //   dean: deanId,
    //   deanAvailable: false
    // }).populate("student", "universityId");
    const bookedSlots = await Session.aggregate([
      {
        $addFields: {
          endTime: {
            $dateFromString: {
              dateString: {
                $concat: [
                  { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                  "T",
                  { $substr: ["$endTime", 0, 5] }, // Extract the time part
                  ":00.000Z",
                ],
              },
              format: "%Y-%m-%dT%H:%M:%S.%LZ",
            },
          },
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              { $gt: ["$endTime", new Date()] }, // Check if endTime is greater than current date
              { $gt: ["$date", new Date()] }, // Check if slotDate is greater than current date
              { $eq: ["$deanAvailable", false] },
              { $eq: [{ $toString: "$dean" }, deanId] },
            ],
          },
        },
      },
    ]);

    if (!bookedSlots) {
      res
        .status(200)
        .json({ message: "There is no current slot booked for you" });
    }
    res.status(200).json(bookedSlots);
  } catch (error: any) {
    console.log("Error in finding booked slot", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
