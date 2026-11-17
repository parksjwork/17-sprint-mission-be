const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct);

module.exports = router;
