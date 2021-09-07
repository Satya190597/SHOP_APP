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
