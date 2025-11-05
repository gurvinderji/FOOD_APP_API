import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    },
  },
  { timestamps: true }
);

const CategoryModel = model("Category", categorySchema);

export default CategoryModel;
