/**
 * Products Controller.
 */

const Product = require("../models/product");

const products = [];

module.exports.getAddProduct = (request, response) => {
  response.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

module.exports.postAddProduct = (request, response) => {
  const product = new Product(request.body.title);
  product.save();
  response.redirect("/");
};

module.exports.getProducts = (request, response) => {
  const products = Product.fetchAll();
  response.render("shop", {
    prods: products,
    docTitle: "shop",
    path: "/",
    pageTitle: "My Shop",
  });
};
