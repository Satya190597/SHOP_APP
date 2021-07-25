/**
 * Products Controller.
 */

const Product = require("../models/product");

const products = [];

module.exports.getProducts = (request, response) => {
  Product.fetchAll((products) => {
    response.render("shop/product-list", {
      prods: products,
      docTitle: "shop",
      path: "/",
      pageTitle: "My Shop",
    });
  });
};

module.exports.getIndex = (request, response) => {
  Product.fetchAll((products) => {
    response.render("shop/product-list", {
      prods: products,
      docTitle: "shop",
      path: "/",
      pageTitle: "My Shop",
    });
  });
};

module.exports.getCart = (request, response) => {
  response.render("shop/cart", { path: "/cart", pageTitle: "Your Cart" });
};

module.exports.getCheckout = (request, response) => {
  response.render("shop/checkout", { path: "/checkout", pageTitle: "Checkout Page" });
};
