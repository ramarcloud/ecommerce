const express = require("express");
const router = express.Router();
const controller = require("../controller/views");

// User Registration API:
router.post("/user_create", controller.userCreate);

router.post("/product_list", controller.product_list)

module.exports = router;
