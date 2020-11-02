const express = require("express");
const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");

let router = express.Router();

const ProductService = require("../services/product");

const {
  requireWebToken,
  confirmUser,
  isAuth,
  isAdmin,
} = require("../middleware");

// Endpoint for 'sitename.com/products', retrieves all products
router.route("/").get(async (req, res, next) => {
  try {
    const products = await ProductService.listProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router
  .route("/new/:userId")
  .get(requireWebToken, isAuth, isAdmin, async (req, res, next) => {
    const productData = req;

    try {
      const product = await ProductService.createProduct(productData);

      res.json(product);
    } catch (error) {
      next(error.message);
    }
  });

router.param("userId", confirmUser);

module.exports = router;
