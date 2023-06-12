import mongoose from "mongoose";

const ORIENTATION_ENUM = Object.freeze({
  F: 'f', 
  M: 'm',
  B: 'b'
})

const GENDER_ENUM = Object.freeze({
  F: 'f',
  M: 'm'
})

const profileSchema = mongoose.Schema({
  dob: { type: String, required: true },
  gender: { type: String, enum: GENDER_ENUM, required: true },
  id: { type: String },
  orientation: { type: String, enum: ORIENTATION_ENUM, required: true },
  zipCode: { type: String, required: true },
});

export default mongoose.model("Profile", profileSchema);