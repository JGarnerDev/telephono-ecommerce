const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { isStringValid, isEmailValid } = require("../utils");

const UserService = require("../services/user");

// GET endpoint for 'sitename.com/users',
//    First checks for a password, then responds with the users in the database.
//    Retrieves all users or forwards an error
router.route("/").get(async (req, res, next) => {
  try {
    if (req.body.pw !== process.env.DB_PASS) {
      throw new SyntaxError(
        `Users list from the database is private material!`
      );
    }
    const users = await UserService.listUsers();
    res.json(users);
  } catch (error) {
    next(error.message);
  }
});

// POST endpoint for 'sitename.com/auth/signup'
//   First checks if the user data is valid, then creates a user object in the database
//   Creates and returns the saved user object or forwards an error
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
    const user = await UserService.createUser(userData);
    const token = jwt.sign({ _id: user._id }, process.env.JWT);
    res.cookie("jwt", token);
    user.password = "";
    res.json({ token, user });
  } catch (error) {
    next(error.message);
  }
});

// GET endpoint for 'sitename.com/auth/login'.
//    First looks for a user object, then compares password against encrypted version.
//    Happy case responds a cookie bearing the JWT, sad case forwards an internal server error
router.route("/login").get(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.findUser(email);

    if (!user) {
      throw new SyntaxError(`No account was found!`);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new SyntaxError(`Wrong password!`);
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT);
    res.cookie("jwt", token);
    user.password = "";
    res.json({ token, user });
  } catch (error) {
    next(error.message);
  }
});

// GET endpoint for 'sitename.com/auth/logout'.
//    Simply deletes the means of accessing private routes (JWT token in cookie)
//    Happy case responds a success message, sad case forwards an internal server error

router.route("/logout").get(async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Logout successful!" });
  } catch (error) {
    next(error.message);
  }
});

module.exports = router;
