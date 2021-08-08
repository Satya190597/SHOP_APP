const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, price, description, imageUrl) {
    this.ID = id;
    this.TITLE = title;
    this.PRICE = price;
    this.DESCRIPTION = description;
    this.IMAGE_URL = imageUrl;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM PRODUCTS");
  }

  save() {
    return db.execute(
      "INSERT INTO PRODUCTS (TITLE,PRICE,DESCRIPTION,IMAGE_URL) VALUES (?,?,?,?)",
      [this.TITLE, this.PRICE, this.DESCRIPTION, this.IMAGE_URL]
    );
  }
};
