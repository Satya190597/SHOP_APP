const Product = require("../models/product");

exports.getIndex = (request, response) => {
  Product.find()
    .then((products) => {
      response.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
        products: products,
      });
    })
    .catch((error) => {
      console.log(error);
      response.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
        products: [],
      });
    });
};

exports.getProducts = (request, response) => {
  Product.find()
    .then((products) => {
      response.render("shop/product-list", {
        products: products,
        pageTitle: "Product List",
        path: "/products",
      });
    })
    .catch((error) => {
      response.render("shop/product-list", {
        products: [],
        pageTitle: "Product List",
        path: "/products",
      });
    });
};

exports.getProduct = (request, response, next) => {
  const id = request.params.productId;
  Product.findById(id)
    .then((product) => {
      response.render("shop/product-detail", {
        product: product,
        pageTitle: "Product Details",
        path: "/products",
      });
    })
    .catch((error) => {
      response.render("shop/product-detail", {
        product: null,
        pageTitle: "Product Details",
        path: "/products",
      });
    });
};
