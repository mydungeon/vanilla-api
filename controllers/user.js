import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { generateOTP, hashPassword, comparePasswords } from "../utils/user.js";
import { FORGOT_PASSWORD_EMAIL } from "../assets/emails/resetPassword.js";
import UserModel from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await comparePasswords(password, oldUser.password)
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashed = await hashPassword(password)
    const result = await UserModel.create({
      email,
      password: hashed,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    }

    const result = await UserModel.create({
      email,
      name,
      googleId,
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error)
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error)
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `User not found` });
    }

    const updatedUser = {
      email, password
    };
    await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error)
  }
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const update = {
    password: await hashPassword(password)
  }
  try {
    const user = await UserModel.findOneAndUpdate({email}, update)
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error)
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `User not found` });
    }
    await UserModel.findByIdAndRemove(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error)
  }
};


export const sendEmail = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP()
  try {
    let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Password reset ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: FORGOT_PASSWORD_EMAIL(otp), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.status(200).json({ otp, message: "An email has been sent" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error)
  }
};