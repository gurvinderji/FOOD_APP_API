import UserModel from "../models/user.model.js";

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

    await UserModel.create({
      username,
      email,
      password,
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
