import CategoryModel from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide category title or image",
      });
    }
    const newCategory = await CategoryModel.create({ title, imageUrl });

    res.status(201).json({
      success: true,
      message: "category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Create Cat API",
      error,
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Categories found",
      });
    }
    res.status(200).json({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Erorr in get All Category API",
      error,
    });
  }
};
