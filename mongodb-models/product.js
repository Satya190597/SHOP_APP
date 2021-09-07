const db = require("../util/database").getDb;

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const database = db();
    return database
      .collection("products")
      .insertOne(this)
      .then((result) => result)
      .catch((error) => {
        throw "Unable to save product data.";
      });
  }
}

module.exports = Product;
