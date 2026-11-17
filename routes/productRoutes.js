const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct).patch(updateProduct);

module.exports = router;
