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

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, imageUrl } = req.body;
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).json({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in update cat api",
      error,
    });
  }
};

// DLEETE CAT
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide Category ID",
      });
    }
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(500).json({
        success: false,
        message: "No Category Found With this id",
      });
    }
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "category Deleted succssfully",
    });
  } catch (error) {
    console.log(error);
    // Check if it's an ObjectId casting error
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid category ID format. ID must be a 24-character hex string.",
      });
    }
    // For other errors
    res.status(500).json({
      success: false,
      message: "error in Delete Cat APi",
      error,
    });
  }
};
