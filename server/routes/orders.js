const express = require("express");
const router = express.Router();
require("dotenv").config();

const OrderService = require("../services/order");
const UserService = require("../services/user");
const ProductService = require("../services/product");

const { requireWebToken, isAuth, confirmUser } = require("../middleware");

router
  .route("/create/:userId")
  .post(requireWebToken, isAuth, async (req, res, next) => {
    try {
      req.body.user = req.profile;
      const order = await OrderService.createOrder(req.body);

      await UserService.addOrderToUserHistory(req.body.user._id, order);

      res.json(order);

      order.products.forEach(async ({ _id, quantity }) => {
        await ProductService.decreaseProductQuantity(_id, quantity);
      });
    } catch (error) {
      next(error.message);
    }
  });

// router
//   .route("/history/:userId")
//   .post(requireWebToken, isAuth, async (req, res, next) => {
//     try {
//     } catch (error) {
//       next(error.message);
//     }
//   });

router.param("userId", confirmUser);

module.exports = router;
