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
  Product.findAll().then((products) => {
    response.render("shop/product-list",{
      products: products,
      pageTitle: "Product List",
      path: "/products",
    })
  }).catch((error) => {
    console.log(error);
  });
};

/**
 * @description  Load index page. route  => Get => /products/:productId
 */
module.exports.getProduct = (request, response, next) => {
  const id = request.params.productId;
  Product.findByPk(id).then((product) => {
    console.log(product)
    response.render("shop/product-detail", {
      product: product,
      pageTitle: "Product Details",
      path: "/products",
    });
  }).catch(error => {
    response.render("shop/product-detail", {
      product: null,
      pageTitle: "Product Details",
      path: "/products",
    });
  })
};

/**
 * @description  Load index page. route  => Get => /
 */
module.exports.getIndex = (request, response) => {
  Product.findAll()
    .then((products) => {
      response.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
        products: products,
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
