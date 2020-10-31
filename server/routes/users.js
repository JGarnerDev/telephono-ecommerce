const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { isStringValid, isEmailValid } = require("../utils");

const UserService = require("../services/user");

// GET endpoint for 'sitename.com/users', retrieves all users or forwards an error
router.route("/").get(async (req, res, next) => {
  try {
    const users = await UserService.listUsers();
    res.json(users);
  } catch (error) {
    // next() is as defined in app.js for handling status codes 404 and 500
    next(error);
  }
});

// POST endpoint for 'sitename.com/users/signup', creates and returns the saved user object or forwards an error
router.route("/signup").post(async (req, res, next) => {
  const userData = req.body;
  const { name, password, email } = userData;

  try {
    if (!isStringValid(name)) {
      throw new SyntaxError(
        `Username must be between 0 and 32 characters long!`
      );
    }
    if (!isStringValid(password)) {
      throw new SyntaxError(
        `Password must be between 0 and 32 characters long!`
      );
    }
    if (!isEmailValid(email)) {
      throw new SyntaxError(`Must submit a vail email!`);
    }
    const newUser = await UserService.createUser(userData);
    res.json({ newUser });
  } catch (error) {
    next(error.message);
  }
});

router.route("/login").get(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.findUser(email);

    if (!user) {
      throw new SyntaxError(`No account was found!`);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new SyntaxError(`Wrong password!`);
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT);
    res.cookie("jwt", token, { expire: new Date() + 10000 });

    res.json({ token, user });
  } catch (error) {
    next(error.message);
  }
});

module.exports = router;
