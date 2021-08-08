/**
 * Products Controller.
 */

const fs = require("fs");
const path = require("path");
const Product = require("../models/product");
const Cart = require("../models/cart");

const products = [];

/**
 * @description  Load product list page. route  => Get => /products
 */
module.exports.getProducts = (request, response) => {
  Product.fetchAll().then(([rows,fieldsData]) => {
    response.render("shop/product-list",{
      products: rows,
      pageTitle: "Product List",
      path: "/products",
    })
  }).catch((error) => {
    console.log(error);
  });
};

module.exports.getProduct = (request, response, next) => {
  const id = request.params.productId;
  Product.findById(id, (product) => {
    response.render("shop/product-detail", {
      products: product,
      pageTitle: "Product Details",
      path: "/products",
    });
  });
};

/**
 * @description  Load index page. route  => Get => /
 */
module.exports.getIndex = (request, response) => {
  Product.fetchAll()
    .then(([rows, fieldsData]) => {
      response.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
        products: rows,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports.getCart = (request, response) => {
  Cart.getCarts((cartItems) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cartItems.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            data: product,
            quantity: cartProductData.quantity,
          });
        }
      }
      response.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        cartProducts: cartProducts,
      });
    });
  });
};

module.exports.postCart = (request, response) => {
  const productId = request.body.productId;

  Product.findById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
  });

  return response.redirect("/cart");
};

module.exports.getCheckout = (request, response) => {
  response.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout Page",
  });
};

module.exports.deleteCartItem = (request, response) => {
  const productId = request.body.productId;
  Product.findById(productId, (product) => {
    Cart.removeCartItem(product.id, product.price, () => {
      return response.redirect("/cart");
    });
  });
};
