const express = require("express");

let router = express.Router();

router.route("/:id").get((req, res) => {
  res.send("SUP");
});

module.exports = router;
