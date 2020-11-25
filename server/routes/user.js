const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { requireWebToken, confirmUser, isAuth } = require("../middleware");

const UserService = require("../services/user");

router
  .route("/:userId")
  .get(requireWebToken, isAuth, async (req, res, next) => {
    try {
      const user = req.profile;
      res.json({
        user,
      });
    } catch (error) {
      next(error.message);
    }
  });

router
  .route("/update/:userId")
  .post(requireWebToken, isAuth, async (req, res, next) => {
    try {
      const user = req.profile;
      const newUserData = req.body.userProfile;
      const updatedUser = await UserService.updateUser(user._id, newUserData);

      const token = jwt.sign({ _id: user._id }, process.env.JWT);
      res.cookie("jwt", token);
      res.json({ token, user: updatedUser });
    } catch (error) {
      next(error.message);
    }
  });

router.param("userId", confirmUser);

module.exports = router;
