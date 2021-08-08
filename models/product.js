const db = require('../util/database');

module.exports = class Products {
  constructor(id, title, price, description, imageUrl) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM PRODUCTS');
  }

};
