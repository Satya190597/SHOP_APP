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
  const userId = request.user._id;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: userId,
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

exports.getEditProduct = (request, response) => {
  const editMode = request.query.edit;
  if (String(true) !== editMode) {
    return response.redirect("/");
  }
  const id = request.params.productId;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        return response.redirect("/");
      }
      response.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editMode: editMode,
        product: product,
        successMessage: null,
      });
    })
    .catch((error) => {
      return response.redirect("/");
    });
};

exports.getProducts = (request, response) => {
  Product.find()
    .then((products) => {
      response.render("admin/product-list", {
        pageTitle: "Admin Product List",
        path: "/admin/product-list",
        prods: products,
      });
    })
    .catch((error) => {
      response.render("admin/product-list", {
        pageTitle: "Admin Product List",
        path: "/admin/product-list",
        prods: [],
      });
    });
};

exports.postEditProduct = (request, response) => {
  const id = request.body.id;
  const title = request.body.title;
  const price = request.body.price;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description;
  Product.findById(id)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product.save();
    })
    .then((result) => {
      return response.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      return response.redirect("/");
    });
};

exports.postDeleteProduct = (request, response, next) => {
  const productId = request.body.productId;
  Product.findByIdAndRemove(productId)
    .then((result) => {
      response.redirect("/");
    })
    .catch((error) => {
      response.redirect("/");
    });
};
