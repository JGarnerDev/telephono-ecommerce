const express = require("express");
const router = express.Router();

const { requireWebToken, confirmUser, isAuth } = require("../middleware");

router.route("/:userId").get(requireWebToken, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param("userId", confirmUser);

module.exports = router;
