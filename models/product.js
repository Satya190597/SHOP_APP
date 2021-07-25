const fs = require("fs");
const { dirname } = require("path");
const path = require("path");

const products = [];

const p = path.join(
  dirname(require.main.filename),
  "data",
  "products.json"
);

// Helper Function - to read data from file.
const getProductsFromFile = cb => {
  fs.readFile(p,(error,fileContent) => {
    if(error) {
      cb([]);
    }
    cb(JSON.parse(fileContent))
  })
}

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save(cb) {
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (error, response) => {   
        cb();   
      });
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }
    
};
