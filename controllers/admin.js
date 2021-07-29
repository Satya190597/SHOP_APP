const Product = require("../models/product");

module.exports.getAddProduct = (request, response) => {
  response.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

module.exports.postAddProduct = (request, response) => {
  const title = request.body.title;
  const price = request.body.price;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save(() => {
    return response.redirect("/");
  });
};

module.exports.getProducts = (request, response) => {
  Product.fetchAll((products) => {
    response.render("admin/product-list", {
      pageTitle: "Admin Product List",
      path: "/admin/product-list",
      prods: products
    });
  });
  
};
