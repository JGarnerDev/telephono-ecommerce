const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductCategoryModel = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 32,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", ProductCategoryModel);
