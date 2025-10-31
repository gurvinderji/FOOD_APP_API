import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, phone, address } = req.body;

    if (!username || !email || !password || !address || !phone) {
      return res.status(401).json({
        success: false,
        message: "please provide all fields",
      });
    }

    const exisitingUser = await UserModel.findOne({ email });
    if (exisitingUser) {
      return res.status(302).json({
        success: false,
        message: "Email already registerd please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    res.status(201).json({ success: true, message: "successfully registered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in register api",
      err,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Please provide email or password",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found ",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "login successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error in login api",
      err,
    });
  }
};
