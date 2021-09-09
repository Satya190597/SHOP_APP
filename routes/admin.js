const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// /admin/edit-product => GET
router.get("/edit-product/:productId", adminController.getEditProduct);

// /admin/delete-product => POST
router.post("/delete-product", adminController.postDeleteProduct);

// /admin/edit-product => POST
router.post("/edit-product", adminController.postEditProduct);

router.get("/product-list", adminController.getProducts);

module.exports = router;
