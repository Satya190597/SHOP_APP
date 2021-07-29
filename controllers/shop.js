/**
 * Products Controller.
 */

const fs = require("fs");
const path = require("path");
const Product = require("../models/product");
const Cart = require("../models/cart");



const products = [];

module.exports.getProducts = (request, response) => {
  Product.fetchAll((products) => {
    response.render("shop/product-list", {
      prods: products,
      docTitle: "shop",
      path: "/products",
      pageTitle: "My Shop",
    });
  });
};

module.exports.getProduct = (request, response, next) => {
  const id = request.params.productId;
  Product.findById(id, (product) => {
    response.render("shop/product-detail", {
      product: product,
      pageTitle: "Product Details",
      path: "/products",
    });
  });
};

module.exports.getIndex = (request, response) => {
  Product.fetchAll((products) => {
    response.render("shop/index", {
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

module.exports.postCart = (request,response) => {

  const productId = request.body.productId;

  Product.findById(productId,(product) => {
    Cart.addProduct(product.id,product.price)
  })

  return response.redirect("/cart");

}

module.exports.getCheckout = (request, response) => {
  response.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout Page",
  });
};
