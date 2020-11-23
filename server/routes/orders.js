const express = require("express");
const router = express.Router();
require("dotenv").config();

const OrderService = require("../services/order");
const UserService = require("../services/user");
const ProductService = require("../services/product");

const {
  requireWebToken,
  isAuth,
  isAdmin,
  confirmUser,
} = require("../middleware");

router
  .route("/:userId")
  .get(requireWebToken, isAuth, isAdmin, async (req, res, next) => {
    try {
      const orders = await OrderService.listOrders();
      res.json(orders);
    } catch (error) {
      next(error.message);
    }
  });

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

router
  .route("/shipmentvalues/:userId")
  .get(requireWebToken, isAuth, isAdmin, async (req, res, next) => {
    try {
      const values = await OrderService.getShipmentStatusValues();

      res.json(values);
    } catch (error) {
      next(error.message);
    }
  });

router
  .route("/updatestatus/:userId/:orderId")
  .post(requireWebToken, isAuth, isAdmin, async (req, res, next) => {
    try {
      const _id = req.params.orderId;
      const newStatus = req.body.newStatus;

      await OrderService.updateShipmentStatus(_id, newStatus);
    } catch (error) {
      next(error.message);
    }
  });

router.param("userId", confirmUser);

module.exports = router;
