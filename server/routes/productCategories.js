const express = require("express");
let router = express.Router();

const {
  requireWebToken,
  isAuth,
  isAdmin,
  confirmUser,
} = require("../middleware");

const ProductCategoryService = require("../services/productCategory");

router.route("/").get(async (req, res, next) => {
  try {
    const categories = await ProductCategoryService.listProductCategories();
    res.json(categories);
  } catch (error) {
    next(error.message);
  }
});

router.route("/new").post(async (req, res, next) => {
  const name = req.body.name;
  if (!name) {
    res.status(500).json({ error: "New product categories require a name" });
  }
  try {
    const newProductCategory = await ProductCategoryService.createProductCategory(
      { name }
    );
    res.json(newProductCategory);
  } catch (error) {
    next(error);
  }
});

router.route("/:categoryId").get(async (req, res, next) => {
  try {
    const _id = req.params.categoryId;

    const category = await ProductCategoryService.findCategoryById(_id);

    res.json(category);
  } catch (error) {
    next(error.message);
  }
});

router
  .route("/update/:categoryId/:userId")
  .post(requireWebToken, isAuth, isAdmin, async (req, res, next) => {
    try {
      const _id = req.params.categoryId;
      const updateData = req.body;

      console.log(updateData);
      const updatedCategory = await ProductCategoryService.updateCategoryById(
        _id,
        updateData
      );

      res.json(updatedCategory);
    } catch (error) {
      next(error.message);
    }
  });

router
  .route("/:categoryId/:userId")
  .delete(requireWebToken, isAuth, isAdmin, async (req, res, next) => {
    try {
      const _id = req.params.categoryId;
      const deletedCategory = await ProductCategoryService.deleteCategoryById(
        _id
      );

      res.json(deletedCategory);
    } catch (error) {
      next(error.message);
    }
  });

router.param("userId", confirmUser);

module.exports = router;
