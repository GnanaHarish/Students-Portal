import mongoose from "mongoose";

const deanSchema = new mongoose.Schema({
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


const Dean: any = mongoose.model('Dean', deanSchema);

export default Dean;