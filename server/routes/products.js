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

const { MB } = require("../constants");

// Endpoint for 'sitename.com/products', retrieves all products
router.route("/").get(async (req, res, next) => {
  try {
    const products = await ProductService.listProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Endpoint for 'sitename.com/products/:productId', retrieves a product (without photo) from database
router.route("/:productId").get(async (req, res, next) => {
  try {
    const _id = req.params.productId;
    const product = await ProductService.findProductInfoByID(_id);
    res.json(product);
  } catch (error) {
    error.message = "We couldn't find the product :(";
    next(error.message);
  }
});

// Endpoint for 'sitename.com/products/new/:userId', creates a new product provided that the user is authorized and is admin
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

        const { name, description, price } = fields;
        [name, description, price].forEach((value) => {
          if (!value) {
            return res.status(500).json({ error: "Product form incomplete!" });
          }
        });

        if (files.img) {
          if (files.img.size > MB) {
            return res
              .status(500)
              .json({ error: "Image file size must be less than 1 MB!" });
          }
          product.img.data = fs.readFileSync(files.img.path);
          product.img.contentType = files.img.type;
        }
        product.save((error, result) => {
          if (error) {
            throw new SyntaxError(
              `Product couldn't be saved to database - please try again later!`
            );
          }

          res.json(result.id);
        });
      });
    } catch (error) {
      next(error.message);
    }
  });

// Endpoint for 'sitename.com/products/:productId/:userId', deletes a product from database, provided that the user is authorized, is an admin
router
  .route("/:productId/:userId")
  .post(requireWebToken, isAuth, isAdmin, async (req, res, next) => {
    try {
      const productId = req.params.productId;

      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.parse(req, async (error, fields, files) => {
        if (error) {
          throw new SyntaxError(
            `Files couldn't be upoloaded - please try again later!`
          );
        }

        let product = await ProductService.findProductByID(productId);

        product = _.extend(product, fields);

        const { name, description, price } = fields;
        [name, description, price].forEach((value) => {
          if (!value) {
            return res.status(500).json({ error: "Product form incomplete!" });
          }
        });

        if (files.img) {
          if (files.img.size > MB) {
            return res
              .status(500)
              .json({ error: "Image file size must be less than 1 MB!" });
          }
          product.img.data = fs.readFileSync(files.img.path);
          product.img.contentType = files.img.type;
        }
        product.save((error, result) => {
          if (error) {
            throw new SyntaxError(
              `Product couldn't be saved to database - please try again later!`
            );
          }

          res.json(result.id);
        });
      });
    } catch (error) {
      next(error.message);
    }
  });

// Endpoint for 'sitename.com/products/:productId/:userId', deletes a product from database, provided that the user is authorized, is an admin
router
  .route("/:productId/:userId")
  .delete(requireWebToken, isAuth, isAdmin, async (req, res, next) => {
    try {
      const _id = req.params.productId;
      await ProductService.deleteProductById(_id);
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error.message);
    }
  });

// Endpoint for 'sitename.com/products/:productId/img', retrieves the product image from the database
router.route("/:productId/img").get(async (req, res, next) => {
  try {
    const _id = req.params.productId;
    const img = await ProductService.findProductImageByID(_id);
    res.json(img);
  } catch (error) {
    error.message = "No product image available";
    next(error.message);
  }
});

router.param("userId", confirmUser);

module.exports = router;
