import jwt from "jsonwebtoken";
import UserModel from '../models/user.js'
import ProfileModel from "../models/profile.js";

export const create = async (req, res) => {
  console.log(0, req.body)
  const { dob, gender, orientation, zipCode } = req.body;
  try {
    const user = await UserModel.findOne({ _id: req.userId });
    if (user) {
      const userProfile = await ProfileModel.create({
        dob,
        gender,
        orientation,
        zipCode,
        _id: req.userId
      })
      res.status(200).json({ result: userProfile, token: req.token })
    } else {
      res.status(404).json({ message: "Session expired. Log back in." });
    }    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};