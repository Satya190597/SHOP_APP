/**
 * Products Controller.
 */

const fs = require("fs");
const path = require("path");
const Product = require("../sequelize-models/product");

const products = [];

/**
 * @description  Load product list page. route  => Get => /products
 */
module.exports.getProducts = (request, response) => {
  Product.findAll()
    .then((products) => {
      response.render("shop/product-list", {
        products: products,
        pageTitle: "Product List",
        path: "/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * @description  Load index page. route  => Get => /products/:productId
 */
module.exports.getProduct = (request, response, next) => {
  const id = request.params.productId;
  Product.findByPk(id)
    .then((product) => {
      console.log(product);
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
  request.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      console.log(products);
      response.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        cartProducts: products,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  // Cart.getCarts((cartItems) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cartItems.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({
  //           data: product,
  //           quantity: cartProductData.quantity,
  //         });
  //       }
  //     }
  // response.render("shop/cart", {
  //   path: "/cart",
  //   pageTitle: "Your Cart",
  //   cartProducts: cartProducts,
  // });
  //   });
  // });
  // request.user.getCart().then(cart => {
  //   console.log(cart)
  // })
  // .catch(error => {
  //   console.log(error)
  // })
};

module.exports.postCart = (request, response) => {
  const productId = request.body.productId;
  let fetchedCart;

  request.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products.length > 0 ? products[0] : undefined;
      let newQuantity = 1;
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return fetchedCart
          .addProduct(product, { through: { quantity: newQuantity } })
          .then(() => response.redirect("/cart"));
      }
      // Add a new product to cart.
      Product.findByPk(productId).then((product) => {
        fetchedCart
          .addProduct(product, { through: { quantity: newQuantity } })
          .then(() => {
            return response.redirect("/cart");
          });
      });
    });
  // Product.findById(productId, (product) => {
  //   Cart.addProduct(product.id, product.price);
  // });
};

module.exports.getCheckout = (request, response) => {
  response.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout Page",
  });
};

module.exports.deleteCartItem = (request, response) => {
  request.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: request.body.productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      response.redirect("/cart");
    });

  // const productId = request.body.productId;
  // Product.findById(productId, (product) => {
  //   Cart.removeCartItem(product.id, product.price, () => {
  //     return response.redirect("/cart");
  //   });
  // });
};

module.exports.postOrder = (request, response) => {
  // 1. Get all the cart items.
  let productList;
  request.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      productList = products;
      return request.user.createOrder();
    })
    .then((order) => {
      return order.addProducts(productList);
    })
    .then((result) => {
      return response.redirect("/orders");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports.getOrders = (request, response) => {
  response.render("shop/orders", {
    path: "/orders",
    pageTitle: "Orders Page",
  });
};
