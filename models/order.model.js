import { Schema, model } from "mongoose";

//schema
const ordersSchema = new Schema(
  {
    foods: [{ type: Schema.Types.ObjectId, ref: "Foods" }],
    payment: {},
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "deliverd"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

//export
const OrderModel = model("Order", ordersSchema);
export default OrderModel;
