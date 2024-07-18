const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: [
        "Confirm Order",
        "Out For Delivery",
        "Delivered Order",
        "Cancelled Order",
      ],
    },
  },
  {
    timestamps: true,
  }
);


const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
