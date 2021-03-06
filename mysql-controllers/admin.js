const Product = require("../models/product");

module.exports.getAddProduct = (request, response) => {
  const querySuccess = request.query.success
  response.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editMode: false,
    successMessage: querySuccess ? querySuccess : null
  });
};

module.exports.postAddProduct = (request, response) => {
  const title = request.body.title.trim();
  const price = request.body.price;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description.trim();
  const product = new Product(null, title, price, description, imageUrl);
  product
    .save()
    .then((result) => {
      response.redirect("/admin/add-product?success=true");
    })
    .catch((error) => {
      response.redirect("/admin/add-product?success=false");
    });
};

module.exports.getEditProduct = (request, response) => {
  const editMode = request.query.edit;
  if (String(true) !== editMode) {
    return response.redirect("/");
  }
  const id = request.params.productId;

  Product.findById(id, (product) => {
    if (!product) {
      return response.redirect("/");
    }
    response.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editMode: editMode,
      product: product,
    });
  });
};

module.exports.postEditProduct = (request, response) => {
  const id = request.body.id;
  const title = request.body.title;
  const price = request.body.price;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description;
  const updatedProduct = new Product(id, title, imageUrl, description, price);
  updatedProduct.save(() => {
    return response.redirect("/");
  });
};

module.exports.postDeleteProduct = (request, response, next) => {
  const productId = request.body.productId;
  Product.deleteById(productId, () => {
    response.redirect("/");
  });
};

module.exports.getProducts = (request, response) => {
  Product.fetchAll((products) => {
    response.render("admin/product-list", {
      pageTitle: "Admin Product List",
      path: "/admin/product-list",
      prods: products,
    });
  });
};
