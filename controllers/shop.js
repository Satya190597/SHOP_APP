const Product = require("../models/product");
const Order = require("../models/order");

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

exports.postCart = (request, response) => {
  const productId = request.body.productId;

  Product.findById(productId)
    .then((product) => {
      return request.user.addToCart(product);
    })
    .then((result) => {
      return response.redirect("/cart");
    })
    .catch((error) => {
      response.redirect("/cart");
    });
};

exports.getCart = (request, response) => {
  request.user
    .populate("cart.items.productId")
    .then((user) => {
      response.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        cartProducts: user.cart.items,
      });
    })
    .catch((error) => {});
};

exports.deleteCartItem = (request, response) => {
  const productId = request.body.productId;
  request.user
    .removeFromCart(productId)
    .then((result) => {
      return response.redirect("/cart");
    })
    .catch((error) => {
      return response.redirect("/cart");
    });
};

exports.postOrder = (request, response, next) => {
  request.user
    .populate("cart.items.productId")
    .then((user) => {
      const cartItems = user.cart.items.map((items) => {
        return {
          quantity: items.quantity,
          productData: { ...items.productId._doc },
        };
      });
      const order = new Order({
        products: cartItems,
        user: {
          name: request.user.name,
          userId: request.user._id,
        },
      });
      return order.save();
    })
    .then((result) => {
      return request.user.clearCart();
    })
    .then((result) => {
      return response.redirect("/orders");
    })
    .catch((error) => {
      console.log(error);
      response.redirect("/orders");
    });
};

exports.getOrders = (request, response, next) => {
  Order.find({ "user.userId": request.user._id }).then((orders) => {
    response.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  });
};
