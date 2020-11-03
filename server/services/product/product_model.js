const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId, Buffer } = Schema.Types;

const ProductModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      trim: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      maxlength: 32,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductModel);
