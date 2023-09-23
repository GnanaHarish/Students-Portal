import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  deanAvailable: {
    type: Boolean,
    default: true,
  },
  dean: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dean",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

const Session: any = mongoose.model("Session", sessionSchema);

export default Session;
