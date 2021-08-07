const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch previous Cart.
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err && fileContent.length > 0) {
        cart = JSON.parse(fileContent);
      }
      const existingProduct = cart.products.find(
        (product) => product.id === id
      );

      const existingProductIndex = cart.products.indexOf(existingProduct);

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);
      fs.writeFile(p, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
    // Analyze the cart => Find existing product.
    // Add new product or increase quantity.
  }
  static deleteProduct(id, productPrice) {
    let cart = { products: [], totalPrice: 0 };
    fs.readFile(p, (err, fileContent) => {
      if (err && fileContent.length > 0) {
        return;
      }
      let cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      // Find the quantity of the product.
      const productIndex = updatedCart.products.findIndex(
        (product) => product.id === id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice -
        updatedCart.products[productIndex].quantity * productPrice;
      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== id
      );
      fs.writeFile(p, JSON.stringify(updatedCart), (error) => {
        console.log("Product Deleted From The Cart ....");
      });
    });
  }

  static getCarts(cb) {
    fs.readFile(p, (error, fileContent) => {
      if (error) {
        cb(null);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
