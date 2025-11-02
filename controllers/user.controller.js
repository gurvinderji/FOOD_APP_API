import UserModel from "../models/user.model.js";

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

export const updateUser = async (req, res) => {};
