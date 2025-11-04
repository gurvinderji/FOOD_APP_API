import ResturantModel from "../models/resturant.model.js";

// CREATE RESTURANT
export const createResturant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).json({
        success: false,
        message: "please provide title and address",
      });
    }
    await ResturantModel.create({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    res.status(201).json({
      success: true,
      message: "New Resturant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
  }
};

// GET ALL RESTURNAT
export const getAllResturant = async (req, res) => {
  try {
    const resturants = await ResturantModel.find({});
    if (!resturants) {
      return res.status(404).json({
        success: false,
        message: "No Resturant Availible",
      });
    }
    res.status(200).json({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Get ALL Resturat API",
      error,
    });
  }
};

// GET RESTURNAT BY ID
export const getResturantById = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).json({
        success: false,
        message: "Please Provide Resturnat ID",
      });
    }
    //find resturant
    const resturant = await ResturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).json({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Get Resturarnt by id api",
      error,
    });
  }
};

//DELETE RESTRURNAT
export const deleteResturant = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).json({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
    }
    await ResturantModel.findByIdAndDelete(resturantId);
    res.status(200).json({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Eror in delete resturant api",
      error,
    });
  }
};
