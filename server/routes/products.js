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
  .post(requireWebToken, isAuth, isAdmin, async (req, res, next) => {
    try {
      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.parse(req, (error, fields, files) => {
        if (error) {
          throw new SyntaxError(
            `Files couldn't be upoloaded - please try again later!`
          );
        }
        let product = ProductService.createProduct(fields);

        if (files.img) {
          product.img.data = fs.readFileSync(files.img.path);
          product.img.contentType = files.img.type;
        }
        product.save((error, product) => {
          if (error) {
            throw new SyntaxError(
              `Product couldn't be saved to database - please try again later!`
            );
          }
          res.json(product);
        });
      });
    } catch (error) {
      next(error.message);
    }
  });

router.param("userId", confirmUser);

module.exports = router;
