const express = require("express");
const router = express.Router();
const sendGridMailing = require("@sendgrid/mail");

require("dotenv").config();

sendGridMailing.setApiKey(process.env.SENDGRID_API_KEY);

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
  .route("/history/:userId")
  .get(requireWebToken, isAuth, async (req, res, next) => {
    try {
      const _id = req.params.userId;
      const orders = await OrderService.listUserOrderHistory(_id);
      res.json(orders);
    } catch (error) {
      next(error.message);
    }
  });

router
  .route("/create/:userId")
  .post(requireWebToken, isAuth, async (req, res, next) => {
    try {
      // Take the request body, turn it into an order-model object, save it, send it back
      req.body.user = req.profile;
      const order = await OrderService.createOrder(req.body);
      await UserService.addOrderToUserHistory(req.body.user._id, order);
      res.json(order);

      // Form an email notification, send it to user address
      const emailForAdmin = {
        to: `${process.env.MY_EMAIL}`,
        from: `${process.env.MY_EMAIL}`,
        subject: `eCommerce project - someone made an order!`,
        html: `
        <h1>Hey Jeff! Someone made a test purchase</h1>
        <h2>Customer name: ${order.user.name}</h2>
        <h2>Customer address: ${order.address}</h2>
        <h2>User's email: ${order.user.email}</h2>
        <h2>Total products: ${order.products.length}</h2>
        <h2>Transaction id: ${order._id}</h2>
        <h2>Order status: ${order.status}</h2>
        <h2>Product details:</h2>
        <hr />
        ${order.products
          .map(({ name, price, quantity }) => {
            return `<div>
                    <h3>Product name: ${name}</h3>
                    <h3>Priced at: ${price}</h3>
                    <h3>Quantity: ${quantity}</h3>
            </div>`;
          })
          .join("--------------------")}
        <h2>Total order cost: ${order.amount}<h2>
     `,
      };

      sendGridMailing
        .send(emailForAdmin)

        .catch((error) =>
          console.log("XXX Unsuccessful email! ", error.response.body.errors)
        );

      const emailForClient = {
        to: order.user.email,
        from: `${process.env.MY_EMAIL}`,
        subject: `You order is in process`,
        html: `
        <h1>Hey ${
          req.profile.name
        }, thank you for trying out my eCommerce Project!</h1>
        <h3> Here's the product order information: </h3>
        <hr />
        <h2>Total products ordered: ${order.products.length}</h2>
        <h2>Transaction id: ${order._id}</h2>
        <h2>Order status: ${order.status}</h2>
        <br >
        <h2>Product details:</h2>
        <hr />
        ${order.products
          .map(({ name, price, quantity }) => {
            return `<div>
            <h3>Product name: ${name}</h3>
            <h3>Priced at: ${price}</h3>
            <h3>Quantity: ${quantity}</h3>
            </div>`;
          })
          .join("--------------------")}
        <h2>Total cost: ${order.amount}<h2>
        <p>Thanks again!</p>`,
      };

      sendGridMailing
        .send(emailForClient)
        .catch((error) =>
          console.log("XXX Unsuccessful email! ", error.response.body.errors)
        );

      // Adjust product inventory in db
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

      const updated = await OrderService.updateShipmentStatus(_id, newStatus);
      res.json(updated);
    } catch (error) {
      next(error.message);
    }
  });

router.param("userId", confirmUser);

module.exports = router;
