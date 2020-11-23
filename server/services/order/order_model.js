const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const ProductPurchaseModel = new Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    name: String,
    description: String,
    category: String,
    price: Number,
    quantity: Number,
  },
  { timestamps: true }
);

const OrderModel = new Schema(
  {
    products: [ProductPurchaseModel],
    transaction_id: {},
    amount: Number,
    address: { type: String, required: true },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
    clientData: Object,
    updated: Date,
    user: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderModel);
