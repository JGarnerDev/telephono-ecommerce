const express = require("express");
let router = express.Router();

const ProductService = require("../services/product");

// Endpoint for 'sitename.com/products', retrieves all products
router.route("/").get(async (req, res, next) => {
  try {
    const products = await ProductService.listProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.route("/:id").get((req, res) => {
  res.send("SUP");
});

module.exports = router;
