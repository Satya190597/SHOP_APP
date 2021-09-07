const Product = require("../models/product");

exports.getAddProduct = (request, response) => {
  const querySuccess = request.query.success;
  response.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editMode: false,
    successMessage: querySuccess ? querySuccess : null,
  });
};

exports.postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const imageUrl = request.body.imageUrl;
  const price = request.body.price;
  const description = request.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
  });
  product
    .save()
    .then((result) => {
      response.redirect("/admin/add-product?success=true");
    })
    .catch((error) => {
      response.redirect("/admin/add-product?success=false");
    });
};
