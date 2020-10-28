const express = require("express");
let router = express.Router();

const UserService = require("../services/user");

// Endpoint for 'sitename.com/users', retrieves all users
router.route("/").get(async (req, res, next) => {
  try {
    const users = await UserService.listUsers();
    res.json(users);
  } catch (error) {
    // next() is as defined in app.js for handling status codes 404 and 500
    next(error);
  }
});

module.exports = router;
