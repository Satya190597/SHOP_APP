const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/cart", shopController.getCart);

// => Cart POST Route.
router.post("/cart", shopController.postCart);

router.get("shop/checkout", shopController.getCheckout);

// Dynamic Routes | => GET Route.
router.get("/products/:productId", shopController.getProduct);

module.exports = router;
