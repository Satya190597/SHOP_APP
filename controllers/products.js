/**
 * Products Controller.
 */

const products = [];

module.exports.getAddProduct = (request, response) => {
  response.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

module.exports.postAddProduct = (request, response) => {
  products.push({ title: request.body.title });
  response.redirect("/");
};

module.exports.getProducts = (request, response) => {
  response.render("shop", {
    prods: products,
    docTitle: "shop",
    path: "/",
    pageTitle: "My Shop",
  });
};
