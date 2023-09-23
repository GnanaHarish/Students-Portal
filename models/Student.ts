import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
  universityId: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});


const Student:  any = mongoose.model('Student', studentSchema);

export default Student;
