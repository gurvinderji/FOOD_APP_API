import { Schema, model } from "mongoose";

//schema
const foodSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is require"],
    },

    description: {
      type: String,
      required: [true, " food description is requir"],
    },

    price: {
      type: Number,
      required: [true, "food price is require"],
    },

    imageUrl: {
      type: String,
      default:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    },

    foodTags: {
      type: String,
    },

    catgeory: {
      type: String,
    },

    code: {
      type: String,
    },

    isAvailabel: {
      type: Boolean,
      default: true,
    },

    resturant: {
      type: Schema.Types.ObjectId,
      ref: "Resturant",
      required: [true, "resturant id is require"],
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

//export
const FoodModel = model("Food", foodSchema);
export default FoodModel;
