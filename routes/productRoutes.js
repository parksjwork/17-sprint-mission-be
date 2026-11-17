const express = require("express");
const router = express.Router();

const { getProducts } = require("../controllers/productController");
const { createProduct } = require("../controllers/productController");

router.route("/").get(getProducts).post(createProduct);

module.exports = router;
