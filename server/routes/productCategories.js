const express = require("express");
let router = express.Router();

const ProductCategoryService = require("../services/productCategory");

router.route("/new").get(async (req, res, next) => {
  const categoryData = req.body;
  const { name } = categoryData;
  if (!name) {
    res.status(500).json({ error: "New product categories require a name" });
  }
  try {
    const newProductCategory = await ProductCategoryService.createProductCategory(
      categoryData
    );
    res.json({ newProductCategory });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
