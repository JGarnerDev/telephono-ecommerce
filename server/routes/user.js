const express = require("express");
const router = express.Router();

const { requireWebToken, confirmUser, isAuth } = require("../middleware");

const UserService = require("../services/user");

router
  .route("/:userId")
  .get(requireWebToken, isAuth, async (req, res, next) => {
    try {
      const user = req.profile;
      user.password = "";
      res.json({
        user,
      });
    } catch (error) {
      next(error.message);
    }
  });

router
  .route("/:userId/update")
  .post(requireWebToken, isAuth, async (req, res, next) => {
    try {
      const user = req.profile;
      const newUserData = req.body.newUserData;
      const updatedUser = await UserService.updateUser(user._id, newUserData);
      user.password = "";
      res.json({
        updatedUser,
      });
    } catch (error) {
      next(error.message);
    }
  });

router.param("userId", confirmUser);

module.exports = router;
