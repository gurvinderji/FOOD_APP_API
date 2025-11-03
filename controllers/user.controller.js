import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    console.log(req.body.id);

    const user = await UserModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "user get successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get user api",
      error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const { username, address, phone } = req.body;
    if (username) {
      user.username = username;
    }
    if (address) {
      user.address = address;
    }
    if (phone) {
      user.phone = phone;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in update user api",
      error,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    //find user
    const user = await UserModel.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Usre Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Privide All Fields",
      });
    }
    const user = await UserModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or invlaid answer",
      });
    }
    //hashing password

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "eror in PASSWORD RESET API",
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ success: true, message: "your account has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in delete user api",
      error,
    });
  }
};
