const fs = require("fs");
const { dirname } = require("path");
const path = require("path");

const products = [];

const p = path.join(dirname(require.main.filename), "data", "products.json");

// Helper Function - to read data from file.
const getProductsFromFile = (cb) => {
  fs.readFile(p, (error, fileContent) => {
    if (error) {
      cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, descriptions, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.descriptions = descriptions;
    this.price = price;
  }

  save(cb) {
    if (this.id) {
      getProductsFromFile((products) => {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        products[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(products), (error, response) => {
          cb();
        });
      });
    } else {
      this.id = Math.random().toString();
      getProductsFromFile((products) => {
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (error, response) => {
          cb();
        });
      });
    }
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
