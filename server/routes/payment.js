const express = require("express");
const router = express.Router();
const braintree = require("braintree");
require("dotenv").config();

const UserService = require("../services/user");

const { requireWebToken, isAuth, confirmUser } = require("../middleware");

var gateway = new braintree.BraintreeGateway({
  // CHANGE ENVIRONMENT TO PRODUCTION
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

router
  .route("/paymenttoken/:userId")
  .get(requireWebToken, isAuth, async (req, res, next) => {
    try {
      gateway.clientToken.generate({}, (error, data) => {
        res.send(data);
      });
    } catch (error) {
      next(error.message);
    }
  });

router
  .route("/:userId")
  .post(requireWebToken, isAuth, async (req, res, next) => {
    try {
      const paymentMethodNonce = req.body.paymentMethodNonce;
      const amount = req.body.amount;
      const options = { submitForSettlement: true };
      gateway.transaction.sale(
        {
          amount,
          paymentMethodNonce,
          options,
        },
        (error, result) => {
          if (result) {
            res.json(result);
          }
        }
      );
    } catch (error) {
      next(error.message);
    }
  });

router.param("userId", confirmUser);

module.exports = router;
